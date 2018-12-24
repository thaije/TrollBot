
# TrollBot
Livestream the video of a  raspberry pi to a webserver (nodejs), which users can
connect to, and control a pan-tilt combo of servos to control the rpi camera.

The order is:   
camera(rpi) --ffmpeg--> nodejs with jsmpeg (rpi) --websocket--> nodejs webapp (rpi) -> client (browser)   



# Installation
Requires ffmpeg, vl4-utils

- `git clone https://github.com/thaije/TrollBot.git`
- `cd TrollBot/video-streaming`
- `npm init`
- `npm install ws`
- `cd ../webapp`
- `npm init`
- `npm install socket.io express`

# How to run
Show available devices: `v4l2-ctl --list-devices`   

- Tab 1:  
    - `cd video-streaming`  
    - `node websocket-relay yoursecret 8081 8082`  
- Tab 2:  
    - `ffmpeg -i /dev/video0 -f mpegts -codec:v mpeg1video -bf 0 -codec:a mp2 -r 30 http://localhost:8081/yoursecret`  
- Tab 3:   
    - `cd webapp`  
    - `node server`  


# Connect to rpi

##### Ubuntu login
User fedya  
Login kutraspberry

##### ssh:
`ssh fedya@192.168.178.68`   
password: kutraspberry
