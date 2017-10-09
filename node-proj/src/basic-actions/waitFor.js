'use strict'

let sleep = require('sleep-promise');

/**
 * 等待给定函数返回true
 */
module.exports = async function waitFor(func, timeout = 10000, checkInterval = 50) {
    let startTimestamp = Date.now();
    while (true) {
        if (await func()) {
            return true;
        }
        else if (Date.now() - startTimestamp > timeout) {
            return false;
        }
        await sleep(checkInterval);
        // else: continue checking
    }
}
