
# TrollBot
Livestream the video of a  raspberry pi to a webserver (nodejs), which users can
connect to, and control a pan-tilt combo of servos to control the rpi camera and laser pointer.

Also see [my blogpost on this project](http://passmethebutter.net/trolling-cats-with-a-camera-guided-laser-pointer-with-a-webapp/ ).

The order is:   

![Diagram](https://github.com/thaije/TrollBot/blob/master/cat_laser_diagram.png)





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

First connect all hardware as defined in the Hardware section.   
Then startup the Raspberrypi and execute the following commands in the terminal:   

- Terminal tab 1:  
    - `cd video-streaming`  
    - `node websocket-relay yoursecret 8081 8082`  
- Terminal tab 2:  
    - Setting for raspberry camera v2 module: 		
	    - `sudo modprobe bcm2835-v4l2`
            - `ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpeg1video -b 800k -r 30 http://localhost:8081/yoursecret`
	    - `ctrl - C`
	    - `ffmpeg -i /dev/video0 -vf "vflip,hflip" -f mpegts -codec:v mpeg1video -bf 0 -s 640x480 -r 30 -b 800k http://localhost:8081/yoursecret`
    - Setting for other cameras (e.g. PS Eye)
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
## Requirements:
- Raspberry PI (tested with 3b+)
- Camera. I used Raspberry PI camera v2, but also tested with PS Eye camera. 
- Laser pointer. I used [this](https://www.adafruit.com/product/1054) one.
- 2 servos. I used 2 HItec HS-422 servos.
- 6v accu pack for the servos.
- pan-tilt set for servos. I used [this](http://www.myduino.com/image/cache/1-250x250-500x500.jpg) pan-tilt set. 
- The RPI camera and laser pointer were mounted on the bracket.

## Wiring:
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



