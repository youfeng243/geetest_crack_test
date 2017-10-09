#!/usr/bin/env bash

set -xe

trap 'echo -e "--------------------------\nSome process is missing...\n--------------------------"' ERR

ps -elf | grep app.js | grep -v grep
ps -elf | grep proxy.js | grep -v grep 
ps -elf | grep squid | grep -v grep
ps -elf | grep gunicorn | grep 7862 | grep -v grep

echo -e "--------------------------\nAll process exists!\n--------------------------"
