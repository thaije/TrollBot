
# Connect to rpi

##### Ubuntu login
User fedya
Login kutraspberry

##### ssh:
`ssh fedya@192.168.178.68`
password: kutraspberry



# Streaming video
The order is:
camera(rpi) --ffmpeg--> nodejs with jsmpeg (rpi) --websocket--> nodejs webapp (rpi) -> client (browser)

# Streaming (ffmpeg)
requires ffmpeg, vl4-utils


# Installation 
`git clone https://github.com/thaije/TrollBot.git`
`cd TrollBot/video-streaming`
`npm init`
`npm install ws`

`cd Troll`


Show available devices: `v4l2-ctl --list-devices`
- Linux: `/dev/video0`


`node websocket-relay yoursecret 8081 8082`
`ffmpeg -i /dev/video0 -f mpegts -codec:v mpeg1video -bf 0 -codec:a mp2 -r 30 http://localhost:8081/yoursecret`
`node server`
