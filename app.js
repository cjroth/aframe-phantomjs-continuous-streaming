const cp = require('child_process')
const WebSocketServer = require('ws').Server
const express = require('express')
const fs = require('fs')
const sharp = require('sharp')

// let phantom = cp.spawn('phantomjs', ['runner.js'])

let wss = new WebSocketServer({ port: 8888 })
wss.on('connection', function connect(ws) {
    fs.watch('out.png', (event, filename) => {
        sharp('input.jpg')
            .rotate()
            .resize(200)
            .toBuffer()
            .then(data => {
                ws.send(png, { binary: true })
            })
            // .catch( err => ... )
    })
})

let app = express()
app.use(express.static('public'))
app.listen(3000)
