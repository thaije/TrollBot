##########################################################
# Author: Tjalling Haije
# Date: 12-01-2019
#
# This file receives the servo and laser commands from Node.js, and sends it to the Python 
# websocket
#
##########################################################

import socket
import time
import sys

# Send command to socket
def send_command(hor, vert, laser):

    UDP_ip = "127.0.0.1"
    UDP_port = 5005

    message = [hor, vert, laser]

    print ("UDP target IP:", UDP_ip)
    print ("UDP target port:", UDP_port)
    print ("message:", message)

    # Internet, UDP
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(str(message).encode(), (UDP_ip, UDP_port))


def err():
    # check rpi-control/control.py for meanings
    print("Invalid arguments. Use: python3 sendCommand.py hor(-100, 100) vert(-100,100) laser(-1, 1)")
    sys.exit(1)

# check for missing arguments
if len(sys.argv) < 4:
    err()

# get command line arguments
hor = int(float(sys.argv[1]))
vert = int(float(sys.argv[2]))
laser = int(float(sys.argv[3]))

# check inputs even more
if hor > 100 or hor < -100 or vert > 100 or vert < -100 or laser > 1 or laser < -1:
    err()

# send command
send_command(hor, vert, laser)
