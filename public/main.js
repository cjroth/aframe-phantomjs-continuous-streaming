var ws = window.packages['websocket-stream']('ws://localhost:8888', { binary: true })

let canvas = document.querySelector('canvas')
canvas.width = 300
canvas.height = 225

let context = canvas.getContext('2d')

ws.on('data', data => {
    let image = new Image()
    image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
    image.src = 'data:image/png;base64,' + data
})
