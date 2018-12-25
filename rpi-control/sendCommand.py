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
    print("Invalid arguments. Use: python3 sendCommand.py hor(-100, 100) vert(-100,100) laser(0, 1)")
    sys.exit(1)

# check for missing arguments
if len(sys.argv) < 4:
    err()

# get command line arguments
hor = int(sys.argv[1])
vert = int(sys.argv[2])
laser = int(sys.argv[3])

# check inputs even more
if hor > 100 or hor < -100 or vert > 100 or vert < -100 or laser > 1 or laser < 0:
    err()

# send command
send_command(hor, vert, laser)
