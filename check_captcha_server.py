# encoding=utf-8
import random
from multiprocessing.dummy import Pool as ThreadPool

import requests

static_proxy_url = 'http://112.74.163.187:23128/__static__/proxies.txt'

proxy_list = []
r = requests.get(static_proxy_url, timeout=40)
if r is None or r.status_code != 200:
    raise Exception("代理更新异常...")
line_list = r.text.strip().split('\n')
for line in line_list:
    line = line.strip().strip("\r").strip("\n")
    if len(line) <= 0:
        continue
    proxy_list.append("http://" + line)

print '更新代理成功...'


# 获取动态代理
def test_post(proxy, url):
    try:
        print "当前测试代理: proxy = {}".format(proxy)
        json = {
            "proxy": proxy,
            "searchBtnSelector": "#btnSearch",
            "searchText": u"数据科技有限",
            "searchInputSelector": "#txtSearch",
            "url": "http://jl.gsxt.gov.cn/",
            "successIndicatorSelector": ".m-search-list",
            "resultIndicatorSelector": ".m-searchresult-inoformation"
        }
        page = requests.post(url, json=json)
    except:
        return 100, "fail"
    return page.status_code, page.content


def test_machine(url, machine):
    print "当前测试机器: {}".format(machine)
    pool = ThreadPool(processes=5)
    result_list = []
    try_times = 20
    times = 0

    # proxy_list = []
    # with open("proxies.conf") as p_file:
    #     for line in p_file:
    #         line = line.strip()
    #         proxy = "http://" + line
    #         proxy_list.append(proxy)

    while times < try_times:
        proxy = random.choice(proxy_list)
        result_list.append(pool.apply_async(test_post, args=(proxy, url,)))
        if len(result_list) >= 5:
            for result in result_list:
                code, content = result.get()
                if code == 200 and len(content) >= 1000:
                    print "当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content))
                    pool.close()
                    pool.join()
                    return True, "当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content))
            del result_list[:]
        times += 1
    print "当前机器滑动验证码服务存在问题: {}".format(machine)
    pool.close()
    pool.join()
    return False, "当前机器滑动验证码服务存在问题: {}".format(machine)


def main():
    result_list = []
    pool = ThreadPool(processes=1)

    url = 'http://{}/api/crawl_scripts/gongshang'.format("127.0.0.1:3000")
    result_list.append(pool.apply_async(test_machine, args=(url, "127.0.0.1:3000",)))

    pool.close()
    pool.join()


if __name__ == "__main__":
    main()
