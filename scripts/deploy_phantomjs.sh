#!/usr/bin/env bash
set -ex
PHANTOMJS_PKG=phantomjs-2.1.1-linux-x86_64

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
cd ${DIR}

mkdir -p ./deploy

cd deploy
rm -rf ${PHANTOMJS_PKG}
tar xf ../packages/${PHANTOMJS_PKG}.tar.bz2
ln -s ${PHANTOMJS_PKG} phantomjs
