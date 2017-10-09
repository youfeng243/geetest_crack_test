'use strict'

module.exports = async function (page, selector) {
    return page.evaluate(function(selector) {
        var element = document.querySelector(selector);
        return element.getBoundingClientRect();
    }, selector);
}
