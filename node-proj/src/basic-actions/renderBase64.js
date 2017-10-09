'use strict'

module.exports = async function (page, rect = {}) {
    await page.property('clipRect', rect);
    return await page.renderBase64('png');
}
