#!/usr/bin/env bash
conid=`docker ps -a | grep geetest_crack_test | grep 'Up' |  awk '{print $1}'`
if [ -z "$conid" ]; then
    exit -1
fi
docpid=`ps -ef | grep docker | grep -v grep | awk '{print $2}'`
if [ -z "$docpid" ]; then
    exit -1
fi

node_status=`curl -I -m 10 -o /dev/null -s -w %{http_code} 127.0.0.1:3000`
if [ ! ${node_status} -eq 404 ]; then
    exit -1
fi


pid=`ps -ef | grep ${conid} | grep -v grep | awk '{print $2}'`

echo ${pid}
exit 1
