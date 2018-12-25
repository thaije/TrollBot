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


# check for missing arguments
if len(sys.argv) < 4:
    print("Missing arguments. Use: python3 send.py hor vert laser")
    sys.exit(1)

# get command line arguments
hor = int(sys.argv[1])
vert = int(sys.argv[2])
laser = int(sys.argv[3])

# send command
send_command(hor, vert, laser)
