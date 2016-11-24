const cp = require('child_process')
const WebSocketServer = require('ws').Server
const websocketStream = require('websocket-stream')
const base64 = require('base64-stream')
const express = require('express')

let phantom = cp.spawn('phantomjs', ['runner.js'])

let wss = new WebSocketServer({ port: 8888 })
wss.on('connection', function connect(ws) {
  var stream = websocketStream(ws, { binary: true })
  phantom.stdout.pipe(base64.encode()).pipe(stream)
})

let app = express()
app.use(express.static('public'))
app.listen(3000)
