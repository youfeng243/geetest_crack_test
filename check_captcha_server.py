# encoding=utf-8
from multiprocessing.dummy import Pool as ThreadPool

import requests


# 获取动态代理


def test_post(proxy, url):
    try:
        print "当前测试代理: proxy = {}".format(proxy)
        json = {
            "proxy": proxy,
            "searchBtnSelector": "#search",
            "searchText": u"数据科技",
            "searchInputSelector": "#content",
            "url": "http://gd.gsxt.gov.cn/",
            "resultIndicatorSelector": ".mianBodyStyle"
        }
        page = requests.post(url, json=json)
    except Exception:
        return 100, "fail"
    return page.status_code, page.content


def test_machine(url, machine):
    print "当前测试机器: {}".format(machine)
    pool = ThreadPool(processes=10)
    result_list = []
    try_times = 20
    times = 0
    with open("proxies.conf") as p_file:
        for line in p_file:

            line = line.strip()
            proxy = "http://" + line
            result_list.append(pool.apply_async(test_post, args=(proxy, url,)))
            if len(result_list) >= 20:
                for result in result_list:
                    code, content = result.get()
                    if code == 200 and len(content) >= 1000:
                        print "当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content))
                        pool.close()
                        pool.join()
                        return True, "当前机器滑动验证码服务OK {} code = {} content len = {}".format(machine, code, len(content))
                del result_list[:]
            times += 1
            if times >= try_times:
                break
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
