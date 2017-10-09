'use strict'

module.exports = async function (page, selector) {
    return await page.evaluate(function(selector) {
        var element = document.querySelector(selector);
        element.click();
    }, selector);
}
