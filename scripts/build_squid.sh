#!/usr/bin/env bash
set -ex
SQUID_VERSION=3.5.23

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
cd ${DIR}

INSTANCE_NAME='squidfordownloader'

mkdir -p ./deploy

rm -rf ./tmp/squid
mkdir -p ./tmp/squid
cd ./tmp/squid

rm -rf squid-${SQUID_VERSION}

tar xzf ${DIR}/packages/squid-${SQUID_VERSION}.tar.gz
cd squid-${SQUID_VERSION}

rm -rf ${DIR}/deploy/squid
./configure --prefix=${DIR}/deploy/squid --enable-http-violations --enable-follow-x-forwarded-for
make -j4
make install

CONF_FILE=${DIR}/deploy/squid/etc/squid.conf
sed -i 's/http_port 3128/http_port 53128/g' ${CONF_FILE}
echo -e "\n# ---- patches ----\n" >> ${CONF_FILE}
echo "cache_dir ufs ${DIR}/deploy/squid/var/cache/squid 100 16 256" >> ${CONF_FILE}
echo '
never_direct allow all
cache_peer 127.0.0.1 parent 53228 0 default

via off
forwarded_for off
follow_x_forwarded_for deny all
request_header_access X-Forwarded-For deny all

minimum_object_size 1 bytes
' >> ${CONF_FILE}

#${DIR}/deploy/squid/sbin/squid  -n ${INSTANCE_NAME} -z
