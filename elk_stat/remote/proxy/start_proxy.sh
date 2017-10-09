#!/usr/bin/env bash

ssh -i only_for_proxy.pem -N -D 127.0.0.1:21080 only_for_proxy@vpn-sz.haizhi.com
