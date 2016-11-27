var page = require('webpage').create()
page.viewportSize = { width: 308, height: 230 }

page.open('public/animation.gif', function () {
    setInterval(function() {
        page.render('/dev/stdout', { format: 'png' })
    }, 100)
})
