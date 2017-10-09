const phantom = require('phantom');
const sleep = require('sleep-promise');

const basicActions = require('../basic-actions');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
 
    //await page.property('viewportSize', {width: 800, height: 600});

    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    //const status = await page.open('http://gsxt.hljaic.gov.cn/index.jspx');
    //const status = await page.open('http://www.baidu.com');
    const status = await page.open('http://localhost:8000/test.html');
    console.log(status);

    //const content = await page.property('content');
    //console.log(content);

    console.log('begin sleep');
    await basicActions.waitForSelector(page, '#abcd');
    console.log('selector1 appears');
    await basicActions.waitForSelector(page, '#newDiv');
    console.log('selector2 appears');
    await sleep(1000);
    console.log('sleep ok');

    await basicActions.renderToFile(page, 'test1.png', {height: 80, width: 80});
    await basicActions.renderToFile(page, 'test2.png', {height: 80, width: 80, left: 80});
    await basicActions.renderToFile(page, 'test3.png');

    console.log('renderBase64');
    console.log(await basicActions.renderBase64(page))
    //console.log('renderBuffer');
    //console.log(await baseActions.renderBuffer(page))

    let tmp = await page.evaluate(function(a, b, c) {
        return [a, b, c];
    }, 1, 2, 3)
    console.log('tmp = ' + tmp);

    await page.render('aaa.png');

    await instance.exit();
}());

// node --harmony-async-await async.js
