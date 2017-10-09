const phantom = require('phantom');
const sleep = require('sleep-promise');

const basicActions = require('../basic-actions');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
 
    //await page.property('viewportSize', {width: 800, height: 600});

    await page.on("onResourceRequested", function(requestData) {
        // console.info('Requesting', requestData.url)
    });

    const status = await page.open('http://www.baidu.com');
    console.log(status);

    await basicActions.waitForSelector(page, '#kw');
    await basicActions.setInput(page, '#kw', 'hello');
    await basicActions.click(page, '#su');
    console.log('clicked');

    await basicActions.waitForSelector(page, 'div.result');
    console.log('div.result appears');
    
    await page.render('aaa.png');

    await instance.exit();
}());

// node --harmony-async-await async.js
