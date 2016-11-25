var page = require('webpage').create()
// page.viewportSize = { width: 800, height: 600 }
page.open('http://google.com', function () {
    setInterval(function() {
        page.render('out.png', { format: 'png', quality: 10 })
    }, 1000)
})
