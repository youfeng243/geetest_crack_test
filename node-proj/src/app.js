
const koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const lodash = require('lodash');

const crawl_scripts = require('./crawl_scripts');

const app = koa();
app.use(bodyParser());

// x-response-time

app.use(function *(next){
    const start = new Date;
    yield next;
    const ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next){
    const start = new Date;
    yield next;
    const ms = new Date - start;
    console.log('%s %s - %sms', this.method, this.url, ms);
});


// TEST
const rp = require('request-promise');

async function foo() {
    let resp = await rp('http://www.baidu.com');
    return resp;
}
router.get('/test', function *(next) {
    let resp = yield foo();
    this.body = resp;
})

/*
app.use(function *(next){
  this.body = 'Hello World';
});
*/



router.post('/api/crawl_scripts/:action', async function (next) {
    let scriptName = this.params.action;
    let options = this.request.body;

    let func = crawl_scripts[scriptName];
    if (lodash.isFunction(func)) {
        let result = await func(options);
        this.body = result;
    }
})


app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
