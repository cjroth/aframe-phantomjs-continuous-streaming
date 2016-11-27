let canvas = document.querySelector('#streamed-content')
let client = new WebSocket('ws://localhost:8084/')
let player = new jsmpeg(client, { canvas: canvas })
