#!/usr/bin/env bash
cp -rf Dockerfile_opencv Dockerfile
docker build --no-cache=false -t geetest_opencv .
