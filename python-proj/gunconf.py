# coding:utf-8
import multiprocessing

# import meinheld

# reload = True
# check_config = True
# debug = True
loglevel = 'info'
bind = '0.0.0.0:7862'
accesslog = 'geetest.log'
timeout = 600
# 启动的进程数
workers = multiprocessing.cpu_count()
backlog = 2048
# worker_class = 'meinheld.gmeinheld.MeinheldWorker'
# 后台管理参数
daemon = True
# 接受最大请求数然后重启进程
max_requests = 1000000
max_requests_jitter = 500000

x_forwarded_for_header = 'X-FORWARDED-FOR'
