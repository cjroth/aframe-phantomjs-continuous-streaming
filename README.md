# Browse the web in VR by live streaming a web page into Aframe using PhantomJS and ffmpeg.

![Screenshot](/screenshot.png "Browse the web in VR by live streaming a web page into Aframe using PhantomJS and ffmpeg.")

I am using:

- Node v7.2.0
- PhantomJS v2.1.1
- Chrome v54
- ffmpeg v3.2
- OSX v10.12.1

This setup allows you to continuously render a web page in [PhantomJS](http://phantomjs.org/) and stream it into an [Aframe](http://aframe.io) VR scene by rendering it onto a canvas. It then forwards user events (eg click, keypress) back to PhantomJS allowing the user to interact with the "browser". Not surprisingly, the performance is shit. This is just a proof of concept. Originally my idea was that I could port existing 2D code editing or text editing web applications into Aframe.

I drew a lot of help from Stef van den Ham's blog post on [Recording A Website With PhantomJS And FFMPEG](http://mindthecode.com/recording-a-website-with-phantomjs-and-ffmpeg/) and Dominic Szablewski's post on [HTML Live Video Streaming Via Websockets](http://phoboslab.org/log/2013/09/html5-live-video-streaming-via-websockets).

Going forward I would like to look into [SlimerJS](https://slimerjs.org/) instead of Phantom and even using virtual machines such as VirtualBox.

## Install

First install PhantomJS with `npm install phantomjs-prebuilt -g` or `yarn global add phantomjs-prebuilt`. You can check if it's installed with `phantomjs -v`.

For Mac users, install ffmpeg with `brew install ffmpeg`. You can check if it's installed with `ffmpeg -version`. I'm not sure how you'd install ffmpeg on Windows or Linux, so you are on your own.

Then run `npm install` or `yarn install`. This will automatically run `browserify public/packages.js > public/packages.combined.js` after it installs all of the Node dependencies - see `package.js`.

## Run

This is a little complex to run. You'll need to run:

1. A static file server to host the Aframe scene. You can run this using `npm start` or `yarn start`. These are just shortcuts for `node app.js`. This will run on port 3000.
2. A script that runs PhantomJS, pipes the rendered PNG output to ffmpeg, and then streams the mpeg output from that to a web socket server. I've put the command for this into a script, so you can just run `sh scripts/phantom-ffmpeg-stream.sh`.
3. The web socket server that will stream our mpeg data to the browser. I've also put the command for this into a script so you can just run `sh scripts/start-streaming-server.sh`. This will run on port 8888.

Navigate to `http://localhost:3000`. It will probably take a few seconds for streaming to start. If the 3D web page doesn't show up, try refreshing.

## Development

The PhantomJS script will output to two logfiles:

- `logs/main` which will show general PhantomJS log messages
- `logs/page_errors` which will show any Javascript errors on webpages that you load.

I'd recommend tailing these logs as you work with `tail -f logs/main` and `tail -f logs/page_errors`. The reason for doing this instead of using the usual `console.log` is that we can't output anything to `stdout` except for the raw PNG data since we are piping this into ffmpeg.

## Related Reading

- https://github.com/phoboslab/jsmpeg
- http://mindthecode.com/recording-a-website-with-phantomjs-and-ffmpeg/
- http://stackoverflow.com/questions/21921790/best-approach-to-real-time-http-streaming-to-html5-video-client
- http://phoboslab.org/log/2013/09/html5-live-video-streaming-via-websockets

## License

[MIT Licensed](LICENSE)
