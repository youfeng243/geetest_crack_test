#!/usr/bin/env bash

echo -n "==== $(date +%FT%T) ====  "
echo -e -n "SUCC: `bash -c 'cat nohup.out | egrep SUCCESS | wc -l'`, "
echo -e -n "FAIL: `bash -c 'cat nohup.out | egrep FAILED | grep -v network | wc -l'`, "
echo -e -n "FAIL(network): `bash -c 'cat nohup.out | egrep FAILED | grep network | wc -l'`, "
echo
