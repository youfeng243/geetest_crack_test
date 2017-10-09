#!/bin/bash
#set -ex
cd /geetest_crack_test
source /root/.bashrc
#rm -rf /geetest_crack_test/node-proj/node_modules
cp /root/geetest_crack_test/node-proj/node_modules/ -rf /geetest_crack_test/node-proj
#chown work:ipauser -R /geetest_crack_test/node-proj/node_modules
chmod 777 -R  /geetest_crack_test
pwd
echo $PATH
hostname
#nohup /etc/init.d/squid3 restart &
sh start.sh
#mkdir -p /squid
#/etc/init.d/squid3 restart
#squid3
#tail
