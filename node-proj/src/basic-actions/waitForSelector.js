'use strict'

let waitFor = require('./waitFor');

module.exports = async function waitForSelector(page, selector, visible = true, timeout = 10000, checkInterval = 100) {
    return await waitFor(function() {       // waitFor可以使用闭包，page.evaluate不行。
        return page.evaluate(function(selector, visible){
            var result = document.querySelector(selector);
            if (visible) {
                return (result !== null) && (result.offsetParent !== null);
            }
            else {
                return (result !== null);
            }
        }, selector, visible);
    }, timeout, checkInterval);
}
