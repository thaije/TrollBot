
# TrollBot
Livestream the video of a  raspberry pi to a webserver (nodejs), which users can
connect to, and control a pan-tilt combo of servos to control the rpi camera.

The order is:   
camera(rpi) --ffmpeg--> nodejs with jsmpeg (rpi) --websocket--> nodejs webapp (rpi) -> client (browser)   



### nodejs <-> python
https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js/50627157

# Installation
Requires ffmpeg, vl4-utils, nodejs, npm, pigpio, RPi.GPIO

- `git clone https://github.com/thaije/TrollBot.git`
- `cd TrollBot/video-streaming`
- `npm init`
- `npm install ws`
- `cd ../webapp`
- `npm init`
- `npm install socket.io express`

# How to run
Show available devices: `v4l2-ctl --list-devices`   


- Terminal tab 1:  
    - `cd video-streaming`  
    - `node websocket-relay yoursecret 8081 8082`  
- Terminal tab 2:  
    - `ffmpeg -i /dev/video0 -f mpegts -codec:v mpeg1video -bf 0 -s 640x480 -r 30 http://localhost:8081/yoursecret`  
    - Other possible settings:
        - `-s 1920x1080 -r 30`
        - `-s 1280x720 -r 60`
- Terminal tab 3:
    - `sudo pigpiod`
    - `cd rpi-control`
    - `python3 control.py`

- Terminal tab 4:   
    - `cd webapp`  
    - `node server`  

- Browser tab:
    - http://localhost:5000/
    - On other devices connected to the same network, replace localhost with ip (`ifconfig`) of rpi


# Hardware
#### Servo 1: (vertical servo)
- Black: Ground pinout board
- Red: 6v on pinout board
- Yellow: BCM pin 13

#### Servo 2: (horizontal servo)
- Black: Ground pinout board
- Red: 6v on pinout board
- Yellow: BCM pin 18

#### 6v accu pack
- Black: Ground pinout board
- Red: 6v on pinout board
- Ground pinout board: ground rpi

#### laser
- black: ground rpi
- red: BM pin 4


# Connect to rpi

##### Ubuntu login
User fedya  
Login kutraspberry

##### ssh:
`ssh fedya@192.168.178.68`   
password: kutraspberry
