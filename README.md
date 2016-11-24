# Use PhantomJS to continuously render a web page and stream the result as PNG binary data to the browser rendering it on a canvas.

This is a Node + PhantomJS project. I built it with Node v7.2.0 and PhantomJS v2.1.1 and tested it in Chrome v54. No guarantees that it will work in other versions.

The inspiration for this was to browse a web page inside an [Aframe](http://aframe.io) VR experience by loading the page in Phantom and relaying the result back to the browser and rendering it on a canvas and then forwarding click/keypress events to Phantom.

A better way to do this might be to use ffmpeg instead of PNG streams, but I figured PNG Streams would be a simpler proof-of-concept. I could be wrong.

A lot of the ideas here were borrowed from Stef van den Ham's blog post on [Recording A Website With PhantomJS And FFMPEG](http://mindthecode.com/recording-a-website-with-phantomjs-and-ffmpeg/).


## Install

Run `npm install` or `yarn install`. This will automatically run `browserify public/packages.js > public/packages.combined.js` after it installs all of the Node dependencies - see `package.js`.

## Run

Run `npm start` or `yarn start`. This will start two servers: one being an Express server on port 3000 to serve static files and the other being a web socket server running on port 8888 to stream the PhantomJS output from.

Navigate to `http://localhost:3000` to view the streamed results.

## Issues

This is buggy! Here's the horrific list of bugs:

1. Refreshing the browser breaks things. The streaming still technically works in that there are no errors, but the images no longer correctly load after the first time you connect to the stream. Maybe this is to do with trying to render a PNG starting mid-image?

2. Only the first portion of the image is getting rendered in the browser. I've determined that this is definitely not a problem with Phantom because it outputs the entire image correctly when I direct it to write to png files. I suspect that the stream is somehow getting "chunked" into too small of "chunks". I'm not an expert at streams so any help with this would be highly appreciated.

## License

[MIT Licensed](LICENSE)
