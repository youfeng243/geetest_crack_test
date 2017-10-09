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
    let overLen = 15;
    while (pos < offset + overLen) {
        // console.log(`offset = ${offset}, pos = ${pos}`);
        let x = random(2, 6) * (1 + Math.pow(offset + overLen - pos, 1/2)) / Math.pow(offset, 1/3);
        pos += x;
        track.push(pos);
    }
    track.push(offset + 14);
    track.push(offset + 10);
    track.push(offset + 7);
    track.push(offset + 5);
    track.push(offset + 3);
    track.push(offset + 2);
    return track;
}

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
 
    await page.property('viewportSize', {width: 1280, height: 1024});

    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting ', requestData.url)
    });
    await page.on("onResourceReceived", function(response) {
        console.info('Received ', response.url)
    });
    await page.on("onNavigationRequested", function(url, type, willNavigate, main) {
        console.log('Trying to navigate to: ' + url);
        console.log('Caused by: ' + type);
        console.log('Will actually navigate: ' + willNavigate);
        console.log('Sent from the page\'s main frame: ' + main);
    });

    const status = await page.open('http://jl.gsxt.gov.cn/');
    console.log(status);

    await basicActions.waitForSelector(page, '#txtSearch');
    await basicActions.waitForSelector(page, '#btnSearch');
    await basicActions.setInput(page, '#txtSearch', 'ABC');
    await sleep(500);
    await basicActions.click(page, '#btnSearch');
    console.log('clicked');
    
    await sleep(500);
 
    await basicActions.waitForSelector(page, '.gt_bg.gt_show');
    await basicActions.waitForSelector(page, '.gt_fullbg.gt_show');
    await sleep(200);
    console.log('geetest appears');

    await sleep(500);

    var rect = await basicActions.getElementRect(page, '.gt_bg');
    console.log(`rect: ${JSON.stringify(rect)}`);


    var clip1Base64 = await basicActions.renderBase64(page, rect);
    fs.writeFileSync('clip1.base64.txt', clip1Base64);
    await basicActions.renderToFile(page, 'hlj_clip1.png', rect);


    var rect_knob = await basicActions.getElementRect(page, '.gt_slider_knob');
    var knob_x = rect_knob.left + rect_knob.width/2;
    var knob_y = rect_knob.top + rect_knob.height/3;


    console.log('start initial drag');
    await page.sendEvent('mousedown', knob_x, knob_y);
    await sleep(200);
    knob_x += 3;
    await page.sendEvent('mousemove', knob_x, knob_y + random(-2, 2));
    await sleep(50);
    console.log('end initial drag');
	
	await sleep(200);

    var clip2Base64 = await basicActions.renderBase64(page, rect);
    fs.writeFileSync('clip2.base64.txt', clip2Base64);
    await basicActions.renderToFile(page, 'hlj_clip2.png', rect);

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
    console.log('dragging start');
    for (let trackPoint of track) {
        let x = knob_x + trackPoint;
        // console.log(`x: ${x}`)
        // knob_y += random(-2, 2);
        await page.sendEvent('mousemove', x, knob_y);
        await sleep(100 + random(0, 50));
        // await sleep(random(0, 10));
        // await basicActions.renderToFile(page, `hlj_move_${i++}.jpg`, rect);
    }
    console.log('dragging end');

    /*
    for (let i = 0; i < 50; i++) {
        knob_x += offset.data / 50.0;
        console.log(`knob_x: ${knob_x}`)
        await page.sendEvent('mousemove', knob_x + random(-10, 20), knob_y + random(-20, 10));
        await sleep(20 + random(-10, 10));
        // await basicActions.renderToFile(page, `hlj_move_${i}.jpg`);
    }
    */

    // await page.sendEvent('mousemove', knob_x, knob_y + random(-20, 10));
    await sleep(200 + random(-100, 100));

    await basicActions.renderToFile(page, `hlj_move_end.png`)
    await page.sendEvent('mouseup', knob_x + track[track.length-1], knob_y);
    await basicActions.renderToFile(page, 'hlj_clip_end1.jpg', rect);
    await sleep(500);

    await basicActions.renderToFile(page, 'hlj.png');
    await basicActions.renderToFile(page, 'hlj_clip_end2.jpg', rect);

    let final_wait_result = await basicActions.waitForSelector(page, '.m-searchresult', 3000);
    if (final_wait_result) {
        console.log('======== SUCCESS!! ========');
        await basicActions.renderToFile(page, 'hlj_final.png');
        await instance.exit();
        process.exit(0);
    }
    else {
        console.log('======== FAILED!! ========');
        await instance.exit();
        process.exit(1);
    }
}());

// node --harmony-async-await async.js
