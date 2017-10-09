#!/usr/bin/env bash

cd `dirname $0`;

source ../../env.sh

kill `cat app.node.pid`
killall phantomjs

ps -ef | grep phantomjs | grep -v grep | awk '{print $2}' | xargs kill

sleep 1

mkdir -p tmp
cd tmp

LOGFILE="nohup.out.`date +%F`"

#mv nohup.out nohup.out.`date +%FT%T`
ps -ef | grep node | grep app.js | grep -v grep | awk '{print $2}' | xargs kill
nohup node ../app.js &>>${LOGFILE} &
ln -sf ${LOGFILE} nohup.out
PID=$!
echo "$PID" > ../app.node.pid

