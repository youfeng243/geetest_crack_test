滑动验证码统计与邮件服务:
=============
#### 1. git管理
* git@git.haizhi.me:sunyaxing/geetest_crack_test.git
* master 分支
* zhaohang docker分支

#### 2. 部署位置
* 环境部署: pip install --user -r requirements.txt
* 服务器: cs5
* 启动目录: /home/work/apps/geetest_crack_test/hdyzm_statstics_reporter/app
* 启动用户: work
* 启动方式: sh start.sh

#### 3. 统计服务访问地址 （需要VPN）
* http://cs5:23450

#### 4. 定时邮件统计邮件提醒
* crontab设置位置 work:cs5
* 每日1点20分发送邮件
* 发送邮件代码: send_mail.py
* 邮件提醒人配置: send_mail_config.py
* 当前邮件提醒人员: 'youfeng@haizhi.com', 'hubo@haizhi.com', 'zhangjun@haizhi.com', 'chenzhichao@haizhi.com', 'mengpengyuan@haizhi.com'
* crontab设置: 20 1 * * * /usr/bin/python /home/work/apps/geetest_crack_test/hdyzm_statstics_reporter/app/send_mail.py
* 滑动验证码集群状态监控脚本: work@cs5  captcha_server_mail_reminder.py

#### 5. opencv安装
1. 解压tar.xz文件：先 xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar 然后，再用 tar xvf xxx.tar来解包。

#### 6. nginx 部署位置
* sm5  /home/sunyaxing/workspace/geetest_crack_test/deploy/nginx

#### 7. docker 操作
* docker 挂在 docker exec -it geetest_crack_test /bin/bash

#### 8. 访问端口备注
* 53228 为 proxy.js 访问端口
* 53128 为 缓存服务提供访问端口

#### 9. 服务部署
* 1. 安装必备库 cd scripts; sudo sh yum_install.sh
* 2. docker部署: cd docker_deploy; sh install_docker.sh
* 3. squid部署: cd scripts; sh build_squid.sh
