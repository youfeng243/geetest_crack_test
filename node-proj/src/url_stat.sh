#!/usr/bin/env bash

cat nohup.out | \
    grep '========' | \
    egrep 'SUCC|FAIL' | \
    sed 's/proxy\[.*\]//g' | \
    sed 's/seq\[[0-9]*\]//g' | \
    sed 's/start\[[^]]*\]//g' | \
    sed 's/timeCost\[[0-9]*\]//g' | \
    sed 's/\(http:\/\/sn.gsxt.gov.cn\/ztxy.do\)?.*\]/\1\]/g' | \
    sort|uniq -c

