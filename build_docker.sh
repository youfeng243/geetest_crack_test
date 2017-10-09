#!/usr/bin/env bash
cp -rf Dockerfile_debian Dockerfile
rm -rf node-proj/node_modules
docker build --no-cache=false -t geetest_docker .
