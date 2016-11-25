let ws = new WebSocket('ws://localhost:8888')
ws.binaryType = 'arraybuffer'

let canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600

let context = canvas.getContext('2d')

ws.addEventListener('message', (event) => {

    if (event.data.size === 0) {
        return
    }

    let blob = new Blob([event.data], { type: 'image/png' })

    let image = new Image()
    image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
    }

    image.src = URL.createObjectURL(blob)

})
