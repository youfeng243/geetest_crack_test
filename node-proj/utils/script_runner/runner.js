
const koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const router = require('koa-router')();
const lodash = require('lodash');
const util = require('util');
const vm = require('vm');

const app = koa();
app.use(bodyParser());
app.use(json());

// x-response-time

app.use(function* (next) {
    const start = new Date;
    yield next;
    const ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

app.use(function* (next) {
    const start = new Date;
    yield next;
    const ms = new Date - start;
    console.log('%s %s - %sms', this.method, this.url, ms);
});

const sandboxes = require('./sandboxes');


function runInSandbox(script, sandboxFactory) {
    let result = null, error = null;
    try {
        let sandbox = new sandboxFactory();
        result = vm.runInNewContext(script, sandbox, {displayErrors: true});
    }
    catch (e) {
        error = {
            name: e.name,
            message: e.message,
            stack: e.stack
        };
    }
    return {
        result,
        error
    };
}

router.post('/api/run_script/:namespace', function * (next) {
    let namespace = this.params.namespace;
    let options = this.request.body;
    console.log(`namespace[${namespace}], options[${JSON.stringify(options)}]`);
    if (!sandboxes[namespace]) {
        this.status = 404;
        this.body = {
            error: {
                message: `namespace[${namespace}] not found`
            }
        }
    }
    else {
        this.body = runInSandbox(options.script, sandboxes[namespace]);
    }
})
router.post('/api/run_script', function * (next) {
    let options = this.request.body;
    console.log(`namespace is empty, options[${JSON.stringify(options)}]`);
    this.body = runInSandbox(options.script, Object);
})


app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);
