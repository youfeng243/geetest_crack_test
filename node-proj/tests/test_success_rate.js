'use strict';

const fs = require('fs');
const path = require('path');
const argv = require('optimist').argv;
const rp = require('request-promise');

const randomProxy = require('./random_proxy');

var getFileContent = (relPath) => fs.readFileSync(path.resolve(__dirname, relPath));

// params
const count = argv.count;
const post_body = JSON.parse(getFileContent(argv.body));
const concurrent = argv.concurrent || 1;

console.log(`
    count = ${count}
    concurrent = ${concurrent}
    post_body_file = ${argv.body}
`)

// variables
let cnt_succ = 0, cnt_fail = 0;
let requested = 0;

// main function
let testFunc = async function () {
    for (; requested < count; requested++) {
        let startTime = Date.now();
        let resp = await rp({
            method: 'POST',
            uri: 'http://localhost:3000/api/crawl_scripts/gongshang',
            body: Object.assign({ proxy: randomProxy() }, post_body),
            json: true
        });
        let endTime = Date.now();

        if (resp.success) {
            cnt_succ++;
        }
        else {
            cnt_fail++;
        }
        console.log(`======== ${resp.success?'SUCCESS':'FAILURE'} ========; cost[${endTime-startTime}] succ[${cnt_succ}] fail[${cnt_fail}]`);
    }
}

for (let i = 0; i < concurrent; i++) testFunc()

// node --harmony test_success_rate.js --count 10 --body post_body.json

