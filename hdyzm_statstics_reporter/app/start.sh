#!/usr/bin/env bash

ps -ef | grep gunicorn | grep -v grep  | grep 'app_instance:application' | awk '{print $2}' | xargs kill

echo "滑动验证码统计服务已关闭...等待重启..."
echo "休眠5s"
sleep 5

gunicorn -D -w 2 app_instance:application --bind 0.0.0.0:23450
