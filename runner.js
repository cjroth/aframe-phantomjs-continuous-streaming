phantom.onError = function(msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg]
    if (trace && trace.length) {
        msgStack.push('TRACE:')
        trace.forEach(function(t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''))
        });
    }
    console.log(msgStack.join('\n'))
    phantom.exit(1)
}

var fs = require('fs')
var webpage = require('webpage')
var webserver = require('webserver')

var page = webpage.create()
page.viewportSize = { width: 1440, height: 900 }

var url = 'http://www.nytimes.com/'

page.onConsoleMessage = function(message, lineNumber, sourceId) {
    log(message, 'page_errors')
}

page.onError = function(message) {
    log(message, 'page_errors')
}

page.open(url, function(status) {

    log('opened page ' + url + ': ' + status)

    page.evaluate(function(width, height) {
        document.body.style.width = width + 'px'
        document.body.style.height = height + 'px'
    }, page.viewportSize.width, page.viewportSize.height)

    page.clipRect = {
        top: 0,
        left: 0,
        width: page.viewportSize.width,
        height: page.viewportSize.height
    }

    setInterval(function() {
        page.render('/dev/stdout', { format: 'png' })
    }, 100)

    log('listening on port 8888')

    var server = webserver.create()
    var service = server.listen(8888, function(request, response) {
        var event = JSON.parse(request.post)
        log('event ' + JSON.stringify(event))
        if (event.type === 'load' && typeof event.url === 'string') {
            log('navigating to ' + event.url)
            page.evaluate(function(url) {
                window.location = url
            }, event.url)
        } else {
            page.sendEvent(event.type, event.x, event.y)
        }
        response.statusCode = 204
        response.headers = {
            'Access-Control-Allow-Origin': '*'
        }
        response.write('')
        response.close()
    })

})

function log(message, logfile) {
    logfile = logfile || 'main'
    fs.write('logs/' + logfile, Date() + '\t' + message + '\n', 'a')
}
