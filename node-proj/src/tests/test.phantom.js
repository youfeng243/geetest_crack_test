var system = require('system');
var page = require('webpage').create();

//page.viewportSize = { width: 1920, height: 720 };

page.onResourceRequested = function(requestData) {
    console.info('Requesting', requestData.url)
}

page.open('http://gsxt.hljaic.gov.cn/index.jspx', function() {
    setTimeout(function() {
        page.render('bbb.png');
    }, 1000)
})
