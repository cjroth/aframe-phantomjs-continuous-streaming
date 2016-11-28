let canvas = document.querySelector('#streamed-content')
let client = new WebSocket('ws://localhost:8084/')
let player = new jsmpeg(client, { canvas: canvas })

window.simulateEvent = (event) => {
    fetch('http://localhost:8888', {
        method: 'POST',
        body: JSON.stringify(event)
    })
}
