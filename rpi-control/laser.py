import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

class Laser():
    def __init__(self, pin=4):
        self.pin = pin
        GPIO.setup(self.pin, GPIO.OUT)

    def on(self):
        print("Led on")
        GPIO.output(self.pin, GPIO.HIGH)

    def off(self):
        print("Led off")
        GPIO.output(self.pin, GPIO.LOW)


# if this file is directly ran, do a test
if __name__ == "__main__":
    print("Testing laser")
    laser = Laser()

    laser.on()
    time.sleep(1)
    laser.off()
