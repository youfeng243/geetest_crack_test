#!/usr/bin/env python
# -*- coding: utf-8

# 作用：
# 启动phantomjs，并在父进程退出时，让phantomjs也被杀掉
#
# 原理：
# 使用prctl给当前进程设置一个PR_SET_PDEATHSIG参数（设为SIGKILL）。作用是在父进程退出时，使当前进程收到一个SIGKILL信号，从而也退出。
# 然后再用exec启动phantomjs，phantomjs会替换掉当前进程的映像，但是prctl设置的进程标志不受影响。

import os
import sys
import signal
from ctypes import cdll

###########################
PROCESS = 'phantomjs'
SIGNUM = signal.SIGKILL
###########################

PR_SET_PDEATHSIG = 1  # Constant taken from http://linux.die.net/include/linux/prctl.h

result = cdll['libc.so.6'].prctl(PR_SET_PDEATHSIG, SIGNUM)
if result != 0:      # prctl FAIL
    sys.exit(1)

os.execvp(PROCESS, sys.argv)
