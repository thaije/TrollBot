import servos as servoControl
from laser import Laser
from time import sleep
import socket


multiplier = 2.5

if __name__ == "__main__":
    laser = Laser()
    [verticalServo, horizontalServo] = servoControl.initialize_default_servos()

    UDP_IP = "127.0.0.1"
    UDP_PORT = 5005

    # open socket
    sock = socket.socket(socket.AF_INET, # Internet
                         socket.SOCK_DGRAM) # UDP
    sock.bind((UDP_IP, UDP_PORT))
    print("Listening on 127.0.0.1:5005")

    try:
        # wait for input
        while True:
            data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
            data = eval(data.decode())

            # get data
            hor = data[0]
            vert = data[1]
            ls = data[2]

            print("Socket received command: Hor:", hor, " vert:", vert, " laser:", ls)

            # set servo positions
            verticalServo.setPosition(verticalServo.getPosition() + vert * multiplier)
            horizontalServo.setPosition(horizontalServo.getPosition() + hor * multiplier)

            # set laser position -1=off, 1=on, 0=unchanged
            if ls == 1:
                laser.on()
            elif ls == -1:
                laser.off()


    # cleanup, even when script is given an error (e.g. keyboard interrupt)
    finally:
        laser.off()
        print("Cleaning up servos")
        servoControl.cleanup_servos([verticalServo, horizontalServo])
