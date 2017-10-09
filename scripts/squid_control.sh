#!/usr/bin/env bash

set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../deploy/squid/sbin

INSTANCE_NAME='squidfordownloader'

#####################################

case "$1" in
"start")  
    ./squid -n ${INSTANCE_NAME}
;;  
"stop")  
    ./squid -n ${INSTANCE_NAME} -k shutdown
;;
"reload")  
	./squid -n ${INSTANCE_NAME} -k shutdown && ./squid -n ${INSTANCE_NAME} -k shutdown ; sleep 5 && ./squid -n ${INSTANCE_NAME} -z && ./squid -n ${INSTANCE_NAME}
	#./squid -n ${INSTANCE_NAME} -k reconfigure
;;
"purge")
    cd .. && ./bin/purge -c ./etc/squid.conf -e .
;;
"init")
    ./squid -n ${INSTANCE_NAME} -z
;;
"clean")
    rm -rf ../var/cache/squid/* && ./squid -n ${INSTANCE_NAME} -k shutdown && ./squid -n ${INSTANCE_NAME} -k shutdown ; sleep 5 && ./squid -n ${INSTANCE_NAME} -z && ./squid -n ${INSTANCE_NAME}
;;
*)
    echo "wrong argument"
    echo "Usage: $0 [start|stop|reload|purge|init]"
    echo ""
    exit 1
esac
