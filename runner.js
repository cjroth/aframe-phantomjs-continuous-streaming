var page = require('webpage').create()
page.viewportSize = { width: 300, height: 225 }

page.open('public/animation.gif', function () {
    setInterval(function() {
        page.render('/dev/stdout', { format: 'png' })
    }, 100)
})
