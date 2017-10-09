const phantom = require('../libs/phantom');
const sleep = require('sleep-promise');
const fs = require('fs');
const rp = require('request-promise');
const url = require('url');
const lodash = require('lodash');

const basicActions = require('../basic-actions');

const humanTrackGenerator = require('./human_track_generator');

function random (a, b) {
    return Math.random() * (b-a) + a;
}

function nextPos(pos, offset) {
    var diffabs = Math.abs(offset - pos);
    var diffsign = Math.sign(offset - pos);

    var diffpercent = diffabs / (offset);
    var factor1 = Math.sqrt(diffpercent * (1-diffpercent))+0.4;
    let x = random(2, 5) * factor1 * (1 + Math.pow(diffabs, 1/2)) / Math.pow(offset, 1/3.5);
    return pos + x * diffsign;
}

// UGLY TRICK;
async function modifyPromiseResult(promise, resultSucc, resultFail) {
    try {
        await promise;
        //console.log(`************* modifyPromiseResult[${resultSucc}] **************`)
        return resultSucc;
    }
    catch (e) {
        return resultFail;
    }
}

/*
function buildTrack(offset) {
    let track = [];
    let pos = 0;
    let overLen = 12;
    while (pos < offset + overLen) {
        pos = nextPos(pos, offset + overLen);
        track.push(pos);
    }
    track.push(offset + 10);
    track.push(offset + 7);
    track.push(offset + 5);
    track.push(offset + 3);
    track.push(offset + 2);
    track.push(offset + 1);
    track.push(offset);
    return track;
}
*/

/*

{
	"url": "http://jl.gsxt.gov.cn/",
    "proxy": "haizhi:haizhi@111.73.243.71:8888",
	"searchInputSelector": "#txtSearch",
	"searchBtnSelector": "#btnSearch",
	"searchText": "科技",
	"resultIndicatorSelector": ".m-searchresult"
}

*/

const DEBUG = false;
const LOG_STEP_FILE = false;

let globalSeq = Math.floor(random(1,100000));

async function waitForSelectorList(page, selectors, visible = true, timeout = 10000) {
    if (lodash.isString(selectors)) {
        selectors = [ selectors ];
    }
    let final_wait_result = true;
    for (let sel of selectors) {
        let ok = await basicActions.waitForSelector(page, selectors, visible, timeout);
        if (!ok) {
            final_wait_result = false;
            break;
        }
    }
    return final_wait_result;
}

module.exports = async function(options) {
    let startTimeStr = (new Date()).toISOString();
    let startTime = Date.now();
    let seq = Number(globalSeq++);
    
    let logStepFileNamePrefix = 'gs'
    if (DEBUG) {
        logStepFileNamePrefix += seq;
    }

    console.log(`${Date()} +++++++++++++ a new request start[${startTimeStr}] seq[${seq}] +++++++++++++`);
    console.log(`${Date()} seq[${seq}], options[${JSON.stringify(options)}]`);

    let opt_url = options.url,
        opt_proxy = options.proxy,
        opt_searchInputSelector = options.searchInputSelector,
        opt_searchBtnSelector = options.searchBtnSelector,
        opt_searchText = options.searchText,
        opt_successIndicatorSelector = options.successIndicatorSelector,
        opt_resultIndicatorSelector = options.resultIndicatorSelector;

    let url_parsed = url.parse(opt_url);

    let instance = await phantom.create(['--proxy-type=http', '--proxy=127.0.0.1:53128'], {
        phantomPath: 'phantomjs_runner.py'
    });
    //let instance = await phantom.create();
    try {
        const page = await instance.createPage();
        await page.setting('resourceTimeout', 40000);
        //await page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
        await page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393');
    
        if (opt_proxy) {
            page.property('customHeaders', {
                'x-cs-use-forward-proxy': opt_proxy
            });
        }

        await page.property('viewportSize', {width: 1440, height: 1280});

        await page.on("onResourceRequested", function(requestData, networkRequest) {
            if (DEBUG) {
                console.info('Requesting ', requestData.url);
            }
            for (let key in page.customHeaders) {
                // 貌似ajax的请求有时不会带上page.customHeaders, 在这里trick一下
                if (Object.prototype.hasOwnProperty.call(page.customHeaders, key)) {
                    networkRequest.setHeader(key, page.customHeaders[key]);
                }
            }
        });
        if (DEBUG) {
            await page.on("onResourceReceived", function(response) {
                console.info(`${Date()} Received stage[${response.stage}] status[${response.status}] size[${response.bodySize}] ${response.url}`);
                //console.info('Received ', response.url, 'full: ', JSON.stringify(response));
            });
            await page.on('onResourceTimeout', function(request) {
                console.log('onResourceTimeout (#' + request.id + '): ' + JSON.stringify(request));
            });
            await page.on('onResourceError', function(resourceError) {
                console.log('onResourceError (#' + resourceError.id + 'URL:' + resourceError.url + ')');
                console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
            });
            await page.on('onConsoleMessage', function(msg, lineNum, sourceId) {
                console.log('--------------------------');
                console.log('CONSOLE: ' + msg);
                console.log('--------------------------');
            }); 
            await page.on("onNavigationRequested", function(url, type, willNavigate, main) {
                console.log('Trying to navigate to: ' + url);
                console.log('Caused by: ' + type);
                console.log('Will actually navigate: ' + willNavigate);
                console.log('Sent from the page\'s main frame: ' + main);
            });
            await page.on("onError", function(msg, trace) {
                var msgStack = ['ERROR: ' + msg];
                if (trace && trace.length) {
                    msgStack.push('TRACE:');
                    trace.forEach(function(t) {
                        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
                    });
                }
                console.error(msgStack.join('\n'));
            });
        }


        const status = await page.open(opt_url);
        if (DEBUG) console.log('Page loading status: ' + status);
        if (status != 'success') {
            console.log(`======== FAILED!! (network problem) status[-1] start[${startTimeStr}] timeCost[${Date.now() - startTime}] seq[${seq}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] ========`);
            await instance.exit();
            return {
                success: false,
                status: -1,
            };
        }
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_00_after_load_${url_parsed.hostname}.png`); }

        await sleep(2000);
        let gt_box_wait_result = await basicActions.waitForSelector(page, '.gt_box', false);
        if (DEBUG) console.log(`gt_box_wait_result = ${gt_box_wait_result}`);

        await basicActions.waitForSelector(page, opt_searchInputSelector);
        await basicActions.waitForSelector(page, opt_searchBtnSelector);
        await basicActions.setInput(page, opt_searchInputSelector, opt_searchText);
        // await sleep(500);
        await basicActions.click(page, opt_searchBtnSelector);
        if (DEBUG) console.log('clicked');

        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_10_after_click_${url_parsed.hostname}.png`, rect); }
        
        // await sleep(1000);
    
        
        if (!await basicActions.waitForSelector(page, '.gt_bg.gt_show', true, 10000) || 
            !await basicActions.waitForSelector(page, '.gt_fullbg.gt_show', true, 6000) ||
            !await basicActions.waitForSelector(page, '.gt_slice', true, 6000)) { 
            console.log(`======== FAILED!! (geetest not appear) status[-101] start[${startTimeStr}] timeCost[${Date.now() - startTime}]  seq[${seq}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] ========`);
            await instance.exit();
            return {success: false, status: -101}; 
        }
        await sleep(200);
        if (DEBUG) console.log('geetest appears');
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_20_after_appear_${url_parsed.hostname}.png`, rect); }

        await sleep(2000); // 这个真没办法。。

        var rect = await basicActions.getElementRect(page, '.gt_bg', 5000);
        if (DEBUG) console.log(`rect: ${JSON.stringify(rect)}`);


        var clip1Base64 = await basicActions.renderBase64(page, rect);
        //fs.writeFileSync('clip1.base64.txt', clip1Base64);
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_30_clip1_${url_parsed.hostname}.png`, rect); }


        var rect_knob = await basicActions.getElementRect(page, '.gt_slider_knob');
        var knob_x = random(rect_knob.left + rect_knob.width/4, rect_knob.left + rect_knob.width/4*3);
        var knob_y = random(rect_knob.top + rect_knob.height/4, rect_knob.top + rect_knob.height/4*3);


        if (DEBUG) console.log('start initial drag');
        await page.sendEvent('mousedown', knob_x, knob_y);
        await sleep(50);
        knob_x += random(2,4);
        await page.sendEvent('mousemove', knob_x, knob_y + random(-1, 1));
        await sleep(50);
        if (DEBUG) console.log('end initial drag');
        if (DEBUG) console.log(`${Date()} knob_x: ${knob_x}`)
        
        await sleep(100);

        var clip2Base64 = await basicActions.renderBase64(page, rect);
        // fs.writeFileSync('clip2.base64.txt', clip2Base64);
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_35_clip2_${url_parsed.hostname}.png`, rect); }


        // 滑块的rect
        var sliceRect = await basicActions.getElementRect(page, '.gt_slice');
        var sliceRectRelative = {
            left: sliceRect.left - rect.left,
            right: sliceRect.right - rect.left,
            top: sliceRect.top - rect.top,
            bottom: sliceRect.bottom - rect.top,
        }
        if (LOG_STEP_FILE) { fs.writeFileSync(`${logStepFileNamePrefix}_35_clip2_${url_parsed.hostname}.sliceRect.json`, JSON.stringify(sliceRectRelative)); }

        let lastX, lastY;
        
        /*
        // ======================
        var offset = 100;
        var realOffsetGot = false;
        var offsetRespPromise = rp({
                method: 'POST',
                // uri: 'http://localhost:7862/geetest_crack/recognize_offset',
                uri: 'http://localhost:7862/geetest_crack/recognize_offset2',
                body: {
                    img: clip2Base64,
                    bg_img: clip1Base64,
                    slice_rect: sliceRectRelative
                },
                json: true
            })
        offsetRespPromise.then(function(offsetResp) {
            setTimeout(function(){
                offset = offsetResp.data + random(-1, 1);
                realOffsetGot = true;
                console.log(`get real offset: ${offset}`)
            }, 500);
        });
        console.log(`fake offset: ${offset}`);

        var pos = 0;
        var i = 0;
        console.log('dragging start');
        while (Math.abs(pos-offset) > 1 || !realOffsetGot) {
            i++;
            pos = nextPos(pos, offset);
            let x = knob_x + pos;
            knob_y += Math.trunc(random(-1.4, 1.1));
            await page.sendEvent('mousemove', x, knob_y);
            await sleep(i*3 + random(10, 20));
            lastX = x;
            lastY = knob_y;
        }
        console.log('dragging end');
        */
        
        
        // ======================
        var offsetRespPromise = rp({
                method: 'POST',
                //uri: 'http://localhost:7862/geetest_crack/recognize_offset',
                uri: 'http://localhost:7862/geetest_crack/recognize_offset2',
                body: {
                    img: clip2Base64,
                    bg_img: clip1Base64,
                    slice_rect: sliceRectRelative
                },
                json: true
            });
        var offset = (await offsetRespPromise).data;
        if (DEBUG) console.log(`${Date()} get real offset: ${offset}`);

        let trackObj = humanTrackGenerator.generateTrack(offset);
        let track = trackObj.track;
        if (DEBUG) console.log('dragging start');
        for (let i = 1; i < track.length; i++) {
            let trackPoint = track[i];
            lastX = knob_x + trackPoint[0];
            // console.log(`x: ${x}`)
            lastY = knob_y + trackPoint[1];
            await page.sendEvent('mousemove', lastX + random(0, 1.2), lastY + random(0, 1));
            await sleep(track[i][2] - track[i-1][2] + random(5,10));
            // await sleep(random(0, 10));
            // if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_move_${i++}.png`, rect); }
        }
        if (DEBUG) console.log('dragging end');
        


        /*
        // ======================
        var offsetRespPromise = rp({
                method: 'POST',
                uri: 'http://localhost:7862/geetest_crack/recognize_offset',
                body: {
                    img: clip2Base64,
                    bg_img: clip1Base64
                },
                json: true
            });
        var offset = (await offsetRespPromise).data;

        let track = buildTrack(offset);
        let i = 0;
        console.log('dragging start');
        for (let trackPoint of track) {
            let x = knob_x + trackPoint;
            // console.log(`x: ${x}`)
            knob_y += Math.trunc(random(-1.4, 1.1));
            await page.sendEvent('mousemove', x, knob_y);
            await sleep(20 + random(0, 50));
            // await sleep(random(0, 10));
            // if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_move_${i++}.png`, rect); }
        }
        console.log('dragging end');
        */

        /*
        // ======================
        for (let i = 0; i < 50; i++) {
            knob_x += offset.data / 50.0;
            console.log(`knob_x: ${knob_x}`)
            await page.sendEvent('mousemove', knob_x + random(-10, 20), knob_y + random(-20, 10));
            await sleep(20 + random(-10, 10));
            // if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_move_${i}.png`); }
        }
        */

        // await page.sendEvent('mousemove', knob_x, knob_y + random(-20, 10));
        await sleep(200 + random(0, 100));

        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_40_move_end_${url_parsed.hostname}.png`, rect); }
        await page.sendEvent('mouseup', lastX, lastY);
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_50_clip_end1_${url_parsed.hostname}.png`); }

        await sleep(100);
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_55_clip_end1.5_${url_parsed.hostname}.png`); }


        if (!opt_successIndicatorSelector) {
            opt_successIndicatorSelector = opt_resultIndicatorSelector;
        }

        
        // 等待标识验证结果的selector出现，或successIndicatorSelector出现
        let iconSuccessPromise = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.success', true, 2000), 'success');      // 成功通过
        let iconFailPromise = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.fail', true, 2000), 'fail');            // 失败（位置不对）
        let iconForbiddenPromise = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.forbidden', true, 2000), 'forbidden');  // 被识别出来是机器（被吃掉）
        let iconErrorPromise = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.error', true, 2000), 'error');          // 控件or服务器or网络出错

        let iconSuccessPromise2 = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.gt_success', true, 2000), 'success');      // 成功通过
        let iconFailPromise2 = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.gt_fail', true, 2000), 'fail');            // 失败（位置不对）
        let iconForbiddenPromise2 = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.gt_forbidden', true, 2000), 'forbidden');  // 被识别出来是机器（被吃掉）
        let iconErrorPromise2 = modifyPromiseResult(basicActions.waitForSelector(page, '.gt_ajax_tip.gt_error', true, 2000), 'error');          // 控件or服务器or网络出错

        // 等待其中一个出现
        let iconWaitResult = await Promise.race([
            iconSuccessPromise, iconFailPromise, iconForbiddenPromise, iconErrorPromise,
            iconSuccessPromise2, iconFailPromise2, iconForbiddenPromise2, iconErrorPromise2
        ]);
        if (DEBUG) console.log(`${Date()} *************** seq[${seq}] iconWaitResult = ${iconWaitResult}`);
        // 重新检测success标志
        let successRecheck = await Promise.race([
            iconSuccessPromise,
            iconSuccessPromise2
        ]);
        if (DEBUG) console.log(`${Date()} *************** seq[${seq}] successRecheck = ${successRecheck}`);
        
        if (LOG_STEP_FILE) { await basicActions.renderToFile(page, `${logStepFileNamePrefix}_60_clip_end2_${url_parsed.hostname}.png`); }

        // 如果success没等到, 就退出
        if (iconWaitResult != 'success' && successRecheck != 'success' && successRecheck) {
            console.log(`======== FAILED (geetest fails[${iconWaitResult}])!! status[-102] seq[${seq}] start[${startTimeStr}] timeCost[${Date.now() - startTime}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] track[${trackObj.name}] ========`);
            await instance.exit();
            return {
                success: false,
                status: -102,
            };
        }


        if (await waitForSelectorList(page, opt_successIndicatorSelector, true, 30000)) {
            let isResultAppeared = await waitForSelectorList(page, opt_resultIndicatorSelector, true, 10000);
            if (isResultAppeared) {
                console.log(`======== SUCCESS!! status[0] seq[${seq}] start[${startTimeStr}] timeCost[${Date.now() - startTime}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] track[${trackObj.name}] ========`);
            }
            else {
                console.log(`======== SUCCESS!! status[100] seq[${seq}] (but no result)  start[${startTimeStr}] timeCost[${Date.now() - startTime}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] track[${trackObj.name}] ========`);
            }

            if (options.__SPECIAL_HACK_FOR_CHONGQING__ADD_LINK__) {
                await page.evaluate(require('./special_hack_for_chongqing'));
                await sleep(100);
            }
            if (options.__SPECIAL_HACK_FOR_CHONGQING__CLICK_FIRST__) {
                await page.evaluate(function(){ document.querySelector('.r_lst_nav').click() });
                await sleep(5000);
            }

            //await sleep(500);

            let cookies = await page.property('cookies');
            let content = await page.property('content');
            let page_localStorage = await page.evaluate(function(){return localStorage;});

            if (LOG_STEP_FILE) { 
                await basicActions.renderToFile(page, `${logStepFileNamePrefix}_70_final_succ_${url_parsed.hostname}.png`);
                fs.writeFileSync(`${logStepFileNamePrefix}_70_final_succ_content_${url_parsed.hostname}.txt`, content);
            }

            //await sleep(500);

            await instance.exit();
            return {
                success: true,
                status: isResultAppeared? 0: 100,
                headers: {},
                cookies: cookies,
                localStorage: page_localStorage,
                content: content,
            };
        }
        else {
            console.log(`======== FAILED!! status[-100] seq[${seq}] start[${startTimeStr}] timeCost[${Date.now() - startTime}] url[${opt_url}] urlhost[${url_parsed.host}] proxy[${opt_proxy}] track[${trackObj.name}] ========`);
            let content = await page.property('content');
            if (LOG_STEP_FILE) { 
                await basicActions.renderToFile(page, `${logStepFileNamePrefix}_80_final_fail_${url_parsed.hostname}.png`); 
                fs.writeFileSync(`${logStepFileNamePrefix}_80_final_fail_content_${url_parsed.hostname}.txt`, content);
            }

            await instance.exit();
            return {
                success: false,
                status: -100,
            };
        }
    }
    catch (err) {
        try {
            console.error(`${Date()} seq[${seq}] Encountered error! err[${err}]`);
            await instance.exit();
        }
        catch (err_on_exit) {
            console.error(`${Date()} seq[${seq}] ERROR ON EXIT, KILL PHANTOMJS !!!!!! err[${err}] err_on_exit[${err_on_exit}]`);
            await instance.kill();  // 无论如何要把phantomjs关掉
        }
        await instance.kill();  // 无论如何要把phantomjs关掉
        throw err;
    }
    await instance.kill();  // 无论如何要把phantomjs关掉。。。。
}
