# encoding=utf-8
import random
from email.header import Header
from email.mime.text import MIMEText
from multiprocessing.dummy import Pool as ThreadPool
from smtplib import SMTP

import requests

from logger import Logger

log = Logger('captcha_server_mail.log').get_logger()

mail_from_addr = 'datamonitor@haizhi.com'
mail_password = 'LcoS!WKXmWmFu2Or'
mail_to_addrs = ['youfeng@haizhi.com', 'zhangjun@haizhi.com']

# mail_to_addrs = ['youfeng@haizhi.com']

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


def post_url(proxy, url):
    try:
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
    except Exception as e:
        log.error("请求验证码识别失败:")
        log.exception(e)
        return 100, "fail"
    return page.status_code, page.content


machine_list = [
    "cs3:3000",
    "cs7:3000",
    "cs8:3000",
    "cs9:3000",
    "182.61.44.214:3000",
    "182.61.37.114:3000",
]


def check_machine(url, machine):
    log.info("当前测试机器: {}".format(machine))
    pool = ThreadPool(processes=1)
    result_list = []
    try_times = 0
    while try_times <= 50:
        try_times += 1
        proxy = random.choice(proxy_list)
        log.info("当前使用代理: {}".format(proxy))
        result_list.append(pool.apply_async(post_url, args=(proxy, url,)))
        if len(result_list) >= 1:
            for result in result_list:
                code, content = result.get()
                if code == 200 and len(content) >= 1000:
                    log.info("当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content)))
                    pool.close()
                    pool.join()
                    return True, "当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content))
            del result_list[:]
    log.info("当前机器滑动验证码服务存在问题: {}".format(machine))
    pool.close()
    pool.join()
    return False, "当前机器滑动验证码服务存在问题: {}".format(machine)


def send_email(from_addr, password, to_addrs, subject, msg, smtp_host="smtp.weibangong.com", smtp_port=465):
    email_client = SMTP(smtp_host, smtp_port)
    email_client.login(from_addr, password)
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = from_addr
    msg['To'] = str(to_addrs)
    email_client.sendmail(from_addr, to_addrs, msg.as_string())
    email_client.quit()


def get_now_time():
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def main():
    result_list = []
    pool = ThreadPool(processes=10)
    for machine in machine_list:
        url = 'http://{}/api/crawl_scripts/gongshang'.format(machine)
        result_list.append(pool.apply_async(check_machine, args=(url, machine,)))

    mail_text = ""
    for result in result_list:
        is_success, msg = result.get()
        mail_text += msg + '\r\n'

    pool.close()
    pool.join()

    send_email(
        mail_from_addr,
        mail_password,
        mail_to_addrs,
        '滑动验证码集群监控 - %s' % get_now_time(),
        MIMEText(mail_text, 'plain', 'utf-8')
    )


if __name__ == "__main__":
    try:
        main()
        log.info("{} 顺利发送邮件!".format(get_now_time()))
    except Exception as e:
        log.error("邮件发送失败:")
        log.exception(e)
