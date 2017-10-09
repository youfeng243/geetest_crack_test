# -*- coding: utf8 -*-

from flask import Flask, render_template, request
import statstics
import utils
import datetime

def avoid_zero(x):
    if x==0: return 1
    return x

def create_app(conf):
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/report')
    def report():
        # 起止时间
        ts_from = utils.parse_int(request.args.get('ts_from', None))
        ts_to = utils.parse_int(request.args.get('ts_to', None))

        now = datetime.datetime.now()
        if ts_from: dt_from = datetime.datetime.fromtimestamp(ts_from)
        else: dt_from = utils.truncate_datetime(now - datetime.timedelta(days=1))

        if ts_to: dt_to = datetime.datetime.fromtimestamp(ts_to)
        else: dt_to = utils.truncate_datetime(dt_from + datetime.timedelta(days=1)) - datetime.timedelta(seconds=1)
        
        # 查询统计
        stat_result = statstics.get_site_status_status(conf.ES_SERVERS, conf.ES_INDEX, dt_from, dt_to)['aggregations']

        status_enums = [0, 100, -1, -100, -101, -102]
        
        ############## 总量统计 ##############
        status_table_dict = utils.es_aggs_to_count_dict(stat_result['status_table'])
        status_table = [
            [u'状态码', u'数量', u'解释'],
            [u'status == 0', status_table_dict.get(0, 0), u'成功'],
            [u'status == 100', status_table_dict.get(100, 0), u'成功 但目标DOM元素没出现。可能原因是：1.搜索无结果 2.传入参数问题 3.有较小的可能性是由于封禁'],
            [u'status == -1', status_table_dict.get(-1, 0), u'失败(网络故障)。页面加载失败，可能原因是：1.站点本身挂了 2.指定的代理不可用或被封禁 3.验证码破解服务的缓存代理或出口分发代理挂了'],
            [u'status == -100', status_table_dict.get(-100, 0), u'失败(最终失败)。可能原因：1.站点封禁 2.最后一步网络问题 3.破解失败 4.参数传错'],
            [u'status == -101', status_table_dict.get(-101, 0), u'失败(滑动控件未出现)。可能原因与status==-1的情况类似'],
            [u'status == -102', status_table_dict.get(-102, 0), u'失败(破解失败)。滑动位置错误或者被识别出是机器滑动的。（这个统计项可能不准确，有一部分会计入status==-100）']
        ]

        total = sum([status_table_dict.get(status, 0) for status in status_enums])
        total_success_rate = 1.0 * status_table_dict.get(0, 0) / avoid_zero(total)
        total_success_rate2 = 1.0 * status_table_dict.get(0, 0) / avoid_zero(total - status_table_dict.get(-1, 0))
        ############## 分站点统计 ##############
        site_status_table_dict = utils.es_aggs_to_dict(stat_result['site_status_table'])
        site_status_table = [
            [u'站点', u'成功(status==0)', u'成功(status==100)', u'失败(status==-1)', u'失败(status==-100)', 
                u'失败(status==-101)', u'失败(status==-102)', u'总成功率', u'排除网络问题成功率']
        ]
        for site in sorted(site_status_table_dict.keys()):
            site_dict = utils.es_aggs_to_count_dict(site_status_table_dict[site]['status'])
            site_total = sum([site_dict.get(status, 0) for status in status_enums])
            site_status_table.append([
                site,
                site_dict.get(0, 0),
                site_dict.get(100, 0),
                site_dict.get(-1, 0),
                site_dict.get(-100, 0),
                site_dict.get(-101, 0),
                site_dict.get(-102, 0),
                '%.5f' % (1.0 * site_dict.get(0, 0) / avoid_zero(site_total)),
                '%.5f' % (1.0 * site_dict.get(0, 0) / avoid_zero(site_total - site_dict.get(-1, 0))),
            ])
        ############## 分实例统计 ##############
        instance_status_table_dict = utils.es_aggs_to_dict(stat_result['instance_status_table'])
        instance_status_table = [
            [u'instance名称', u'成功(status==0)', u'成功(status==100)', u'失败(status==-1)', u'失败(status==-100)', 
                u'失败(status==-101)', u'失败(status==-102)', u'总成功率', u'排除网络问题成功率']
        ]
        for instance in sorted(instance_status_table_dict.keys()):
            instance_dict = utils.es_aggs_to_count_dict(instance_status_table_dict[instance]['status'])
            instance_total = sum([instance_dict.get(status, 0) for status in status_enums])
            instance_status_table.append([
                instance,
                instance_dict.get(0, 0),
                instance_dict.get(100, 0),
                instance_dict.get(-1, 0),
                instance_dict.get(-100, 0),
                instance_dict.get(-101, 0),
                instance_dict.get(-102, 0),
                '%.5f' % (1.0 * instance_dict.get(0, 0) / avoid_zero(instance_total)),
                '%.5f' % (1.0 * instance_dict.get(0, 0) / avoid_zero(instance_total - instance_dict.get(-1, 0))),
            ])
        ############## 成功部分的耗时分布统计 ##############
        timecost_range_table = [
            [u'时间区间（秒）', u'数量', u'平均值（秒）', u'中位值（秒）']
        ]
        for bucket in stat_result['timeCostSucc']['timeCost']['buckets']:
            item = [u'%ss ~ %ss' % (bucket['key']/1000, (bucket['key']+5000)/1000), '', '', '']
            if bucket['doc_count'] == 0:
                item[1] = u'0'
                item[2] = u'N/A'
                item[3] = u'N/A'
            else:
                item[1] = bucket['doc_count']
                item[2] = u'%.2fs' % (bucket['avg']['value']/1000)
                item[3] = u'%.2fs' % (bucket['fiftieth']['values']['50.0']/1000)
            timecost_range_table.append(item)
        ############## 总体的耗时的平均、分位值统计 ##############
        total_avg = u'N/A'
        percentile_table = [[u'分位点', u'分位值']]
        if stat_result['timeCostSucc']['doc_count'] > 0:
            total_avg = u'%.2fs' % (stat_result['timeCostSucc']['avg']['value']/1000)

            percentile_stat_dict = { 
                float(key): value 
                for key, value in stat_result['timeCostSucc']['percentile']['values'].iteritems()
            }
            for key in sorted(percentile_stat_dict.keys()):
                percentile_table.append([
                    u'%s%%' % (key),
                    u'%.2fs' % (percentile_stat_dict[key]/1000)
                ])

        return render_template(
            'report.html',
            dt_from=dt_from.strftime('%Y-%m-%d %H:%M:%S'),
            dt_to=dt_to.strftime('%Y-%m-%d %H:%M:%S'),

            status_table=status_table,
            total_success_rate=total_success_rate,
            total_success_rate2=total_success_rate2,

            site_status_table=site_status_table,
            instance_status_table=instance_status_table,

            timecost_range_table=timecost_range_table,
            total_avg=total_avg,
            percentile_table=percentile_table
        )

    return app
