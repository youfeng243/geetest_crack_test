'use strict'

module.exports = async function (page, filename, rect = {}) {
    await page.property('clipRect', rect);
    return await page.render(filename, 'png', 40);
}
