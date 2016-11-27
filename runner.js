var page = require('webpage').create()
page.viewportSize = { width: 1440, height: 900 }

var url = 'http://cnn.com/'

page.open(url, function() {

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

})
