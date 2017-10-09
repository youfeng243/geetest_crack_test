#!/usr/bin/env bash
cp -rf Dockerfile_test Dockerfile
rm -rf node-proj/node_modules
docker build --no-cache=false -t geetest_no_opencv_test .
