#!/usr/bin/env bash

while true
do

pid=`ps -ef | grep proxy.js | grep -v grep | grep node | awk '{print $2}'`
if [ "$pid" == '' ]; then
    nohup node proxy.js &
fi

sleep 10
done