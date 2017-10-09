#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export PATH="$DIR/deploy/phantomjs/bin:$DIR/deploy/node/bin:$DIR/bin:$PATH"
export PYTHONPATH="$PYTHONPATH:/opt/opencv-3.2.0/lib/python2.7/site-packages"


