'use strict';

// Monkey patch before you require http for the first time.
process.binding('http_parser').HTTPParser = require('./http-parser').HTTPParser;
/* 
    打这个patch是由于一个非常坑爹的原因： 有些工商网站的后端接口返回的HTTP数据是有问题的。比如这个 http://nm.gsxt.gov.cn/verify/start.html?t=1483516256956
    它的Header里同时出现了 Transfer-Encoding: chunked 和 Content-Length （而且Content-Length跟数据大小还不一样... -_-||）
    而这种情况在HTTP标准中，是应该被当作错误来处理的（RFC7230）。
    node.js很旧的版本采用了比较宽容HTTP解析器，然而从4.x之后就按照标准来了，这使得对这种不规范HTTP包进行代理时，nodejs的http_parser会报错。
    从长远来看，不考虑换用旧版本的node.js。查了下资料，最后考虑用第三方http-parser替换掉原生http-parser的方法。（原生http-parser好像本来也实现得不怎么样。。）
*/

var http = require('http');
var net = require('net');
var url = require('url');
var fs = require('fs');
var path = require('path');
var request = require('request');


var getFileContent = (relPath) => fs.readFileSync(path.resolve(__dirname, relPath));


var hackingConfig = {};
var argv = require('optimist').argv;
if (argv.hack) {
    var hackingConfig = JSON.parse(getFileContent(argv.hack));
    console.log('hacking config: ', JSON.stringify(hackingConfig, null, 2));
}

let seq = 0;

function onRequest(cReq, cRes) {
    let thisSeq = Number(seq++);

    console.log(`${Date()} seq[${thisSeq}] method: ${cReq.method}, url: ${cReq.url}`);
    //console.log(`method: ${cReq.method}, url: ${cReq.url}, headers: ${JSON.stringify(cReq.headers)}`);
    
    // processing hacking
    var hackingItem = hackingConfig[cReq.url];
    if (hackingItem) {
        console.log(`${Date()} seq[${thisSeq}] hacking!! url[${cReq.url}]`);
        cRes.writeHead(200, {
            'Content-Type': hackingItem.contentType
        });
        cRes.write(getFileContent(hackingItem.contentFile), ()=>cRes.end());
        cRes.end();
        return;
    }

    var u = url.parse(cReq.url);

    var parentProxy = cReq.headers['x-cs-use-forward-proxy'];
    delete cReq.headers['x-cs-use-forward-proxy'];
    delete cReq.headers['via'];
    delete cReq.headers['x-forwarded-for'];

    var options = {
        followRedirect: false,
        uri: cReq.url,
        method     : cReq.method,
        headers    : cReq.headers
        //headers     : Object.assign({}, cReq.headers, {"cache-control":"max-age=259200"})
    };

    if (parentProxy) {
        if (!parentProxy.startsWith('http://')) {
            parentProxy = `http://${parentProxy}`;
        }
        options.proxy = parentProxy;
    }
    console.log(`${Date()} seq[${thisSeq}] use proxy: ${options.proxy}`);

    let startTime = Date.now();
    var pReq = request(options, function(error, response, body) {
        if (!error) {
            console.log(`${Date()} seq[${thisSeq}] remote server responsed. timecost[${Date.now() - startTime}] status[${response.statusCode} ${response.statusMessage}] url[${cReq.url}]`);
        }
        else {
            console.error(`${Date()} seq[${thisSeq}] error! timecost[${Date.now() - startTime}] error[${error}] detail[${JSON.stringify(error)}]`);
            try {
                cRes.writeHead(503);
                cRes.end();
            }
            catch (e) {
                // do nothing
            }
        }
    }); 
    pReq.pipe(cRes);
    cReq.pipe(pReq);
}

function onConnect(cReq, cSock) {
    console.log(`${Date()} method: ${cReq.method}, url: ${cReq.url}, headers: ${JSON.stringify(cReq.headers)}`);

    var u = url.parse('http://' + cReq.url);

    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

let port = argv.port||53228;
http.createServer()
    .on('request', onRequest)
    .on('connect', onConnect)
    .listen(port, '0.0.0.0');

console.log(`Listening at 0.0.0.0:${port}`);

