#!/usr/bin/env bash
#set -ex
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

while true
do

    echo "开始启动滑动验证码服务..."

    cd ${DIR}

    source ./env.sh
    which node
    which python
    echo $PATH

    # 启动python 程序
    cd ${DIR}/python-proj
    sh start_python.sh
    ps -ef | grep gunicorn | grep -v grep

    cd ${DIR}/node-proj/http-proxy
    ps -ef | grep start_proxy.sh | grep -v grep | awk '{print $2}' | xargs kill
    ps -ef | grep proxy.js | grep -v grep | grep node | awk '{print $2}' | xargs kill
    nohup sh start_proxy.sh > nohup.out 2>&1 &
    ps -ef | grep proxy.js | grep -v grep

    cd ${DIR}/node-proj/src
    killall phantomjs
    ps -ef | grep phantomjs | grep -v grep | awk '{print $2}' | xargs kill
    ps -ef | grep start_app.sh | grep -v grep | awk '{print $2}' | xargs kill
    ps -ef | grep app.js | grep -v grep |  grep node | awk '{print $2}' | xargs kill
    nohup sh start_app.sh > nohup.out 2>&1 &
    ps -ef | grep node | grep app.js | grep -v grep

    # 启动加密脚本
    cd ${DIR}/node-proj/utils/script_runner
    ps -ef | grep node | grep runner.js | awk '{print $2}' | xargs kill -9
    nohup node runner.js &

    echo "启动滑动验证码所有服务成功..."
    sleep 12h

done
