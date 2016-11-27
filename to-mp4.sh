phantomjs runner.js | ffmpeg -y -c:v png -f image2pipe -r 10 -t 10 -i - -c:v libx264 -pix_fmt yuv420p -movflags +faststart animation.mp4
