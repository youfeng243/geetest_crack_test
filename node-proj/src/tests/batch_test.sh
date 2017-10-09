#!/usr/bin/env bash

COUNT=10

SUCC=0
FAIL=0

for ((i=0; i<$COUNT; i++)); do 
    echo "TESTING[$i]"

    time node --harmony $1 
    RET=$?
    
    echo "TESTING[$i] FINISHED, RET[$RET]"
    if [[ $RET -eq 0 ]]; then
        ((SUCC++))
    else
        ((FAIL++))
    fi
done

echo "SUCC = $SUCC, FAIL = $FAIL"


