#!/usr/bin/env bash

cd `dirname $0`;

source ../../env.sh

while true
do

pid=`ps -ef | grep app.js | grep -v grep |  grep node | awk '{print $2}'`
if [ "$pid" == '' ]; then
    mkdir -p tmp
    LOGFILE="nohup.out.`date +%F`"
    nohup node app.js &>>tmp/${LOGFILE} &
    cd tmp
    ln -sf ${LOGFILE} nohup.out
    cd ..
fi

sleep 10
done