#!/usr/bin/env bash

set -ex
NODEJS_VERSION=7.7.4

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
cd ${DIR}

mkdir -p ./deploy

cd deploy
rm -rf node-v${NODEJS_VERSION}-linux-x64
tar xf ../packages/node-v${NODEJS_VERSION}-linux-x64.tar.xz
ln -s node-v${NODEJS_VERSION}-linux-x64 node
