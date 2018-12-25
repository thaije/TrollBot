import servos as servoControl
from laser import Laser

from time import sleep



if __name__ == "__main__":
    laser = Laser()
    servos = servoControl.initialize_default_servos()
    
    try:
        print("Start sleep")
        sleep(5)


    # cleanup, even when script is given an error (e.g. keyboard interrupt)
    finally:
        laser.off()
        print("Cleaning up servos")
        servoControl.cleanup_servos(servos)
