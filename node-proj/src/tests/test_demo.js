const phantom = require('phantom');
const sleep = require('sleep-promise');
const fs = require('fs');
const rp = require('request-promise');

const basicActions = require('../basic-actions');

function random (a, b) {
    return Math.random() * (b-a) + a;
}

function buildTrack(offset) {
    let track = [];
    let pos = 0;
    
    offset -= 2;
    
    let overLen = offset * 0.2;
    
    while (pos < offset + overLen) {
        console.log(`offset = ${offset}, pos = ${pos}`);
        let x = random(2, 4) * (1 + Math.pow(offset + overLen - pos, 1/2)) / Math.pow(offset, 1/3);
        pos += x;
        track.push(pos);
    }
	
    while (pos > offset) {
        console.log(`offset = ${offset}, pos = ${pos}`);
        let x = random(1, 3);
        pos -= x;
        track.push(pos);
    }
    
    return track;
}

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
 
    await page.property('viewportSize', {width: 1280, height: 800});

    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open('http://localhost:5000/');
    console.log(status);

    // await sleep(500);

    //await basicActions.waitForSelector(page, '#username1');
    //await basicActions.waitForSelector(page, '#popup-submit');
    //await basicActions.setInput(page, '#username1', 'ABC');
    // await basicActions.click(page, '#popup-submit');
    console.log('clicked');
 
    await basicActions.waitForSelector(page, '#embed-captcha .gt_cut_bg.gt_show');
    await basicActions.waitForSelector(page, '#embed-captcha .gt_cut_fullbg.gt_show');
    console.log('geetest appears');

    await sleep(100);

    await basicActions.renderToFile(page, 'demo_beforedrag.jpg');

    var rect = await basicActions.getElementRect(page, '#embed-captcha .gt_cut_bg.gt_show');
    console.log(`rect: ${JSON.stringify(rect)}`);

    await sleep(200);

    await basicActions.renderToFile(page, 'demo_clip1.jpg', rect);
    var clip1Base64 = await basicActions.renderBase64(page, rect);
    //fs.writeFileSync('clip1.base64.txt', clip1Base64);

    await basicActions.waitForSelector(page, '#embed-captcha .gt_slider_knob.gt_show');

    var rect_knob = await basicActions.getElementRect(page, '#embed-captcha .gt_slider_knob.gt_show');
    var knob_x = rect_knob.left + rect_knob.width/2;
    var knob_y = rect_knob.top + rect_knob.height/3;

    console.log('start initial drag');
    await page.sendEvent('mousedown', knob_x, knob_y);
    await sleep(50);
    knob_x += 3;
    await page.sendEvent('mousemove', knob_x, knob_y + random(-2, 2));
    await sleep(200);
    console.log('end initial drag');


    await basicActions.renderToFile(page, 'demo_clip2.jpg', rect);
    var clip2Base64 = await basicActions.renderBase64(page, rect);
    //fs.writeFileSync('clip2.base64.txt', clip2Base64);

    var offsetResp = await rp({
            method: 'POST',
            uri: 'http://localhost:7862/geetest_crack/recognize_offset',
            body: {
                img: clip2Base64,
                bg_img: clip1Base64
            },
            json: true
        })
    var offset = offsetResp.data + random(-1.5, 1.5);
    console.log(`offset: ${offset}`)

    console.log(`knob_x: ${knob_x}`)

    let track = buildTrack(offset);

    let i = 0;
    for (let trackPoint of track) {
        let x = knob_x + trackPoint;
        console.log(`x: ${x}`)
        // knob_y += random(-2, 2);
        await page.sendEvent('mousemove', x, knob_y + random(-2, 2));
        await sleep(50 + random(0, 50));
        // await basicActions.renderToFile(page, `demo_move_${i++}.jpg`, rect);
    }
    
    /*
    for (let i = 0; i < 20; i++) {
        knob_x += offset / 20.0;
        knob_y += random(-5, 5);
        console.log(`knob_x: ${knob_x}`)
        await page.sendEvent('mousemove', knob_x + random(-10, 20), knob_y);
        // await sleep(10 + random(5, 5));
        await basicActions.renderToFile(page, `demo_move_${i}.jpg`);
    }
    */

    // await page.sendEvent('mousemove', knob_x + offset, knob_y);
    await sleep(200 + random(-100, 100));

    await basicActions.renderToFile(page, `demo_move_end.jpg`)
    await page.sendEvent('mouseup', knob_x + track[track.length-1], knob_y);
    await basicActions.renderToFile(page, 'demo_clip_end1.jpg', rect);
    await sleep(800);
    
    await basicActions.renderToFile(page, 'demo_clip_end2.jpg', rect);
    await basicActions.renderToFile(page, 'demo.jpg');

    console.log('clicking submit');
    await basicActions.click(page, '#embed-submit');

    let final_wait_result = await basicActions.waitForSelector(page, '.success', 200);
    if (final_wait_result) {
        console.log('SUCCESS!!');
        await basicActions.renderToFile(page, 'demo_final.png');
        await instance.exit();
        process.exit(0);
    }
    else {
        console.log('FAILED!!');
        await basicActions.renderToFile(page, 'demo_final.png');
        await instance.exit();
        process.exit(1);
    }

    await instance.exit();
}());

// node --harmony-async-await async.js
