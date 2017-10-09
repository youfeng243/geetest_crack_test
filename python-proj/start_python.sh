#!/usr/bin/env bash

source ../env.sh
ps -ef | grep gunicorn | grep 'app:application' | grep -v grep | grep 'gunconf.py' |awk '{print $2}' | xargs kill
#gunicorn -D -w 8 app:application --bind 0.0.0.0:7862

gunicorn -c gunconf.py app:application
