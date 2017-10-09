'use strict'

module.exports = async function (page, selector, value) {
    return await page.evaluate(function(selector, value) {
        var element = document.querySelector(selector);
        element.value = value;
        element.dispatchEvent(new Event('change'));
        // 参考 http://stackoverflow.com/questions/33063418/simulate-keyboard-input-insert-string-into-textarea-adwords
    }, selector, value);
}
