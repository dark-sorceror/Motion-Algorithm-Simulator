import time
#import matplotlib.pyplot as plt
#from matplotlib.widgets import Button, TextBox, RangeSlider
#import numpy as np

class PID:
    def __init__(self, kP, kI, kD):
        self.previousPos = 0
        self.previousError = 0
        self.kP = kP
        self.kI = kI
        self.kD = kD
        self.integral = 0
       
        self.previousTime = time.time()
    
    def compute(self, targetPos, currentValue):
        error = targetPos - currentValue
            
        currentTime = time.time()
        deltaTime = currentTime - self.previousTime
        
        if deltaTime == 0:
            deltaTime = 1e-16 # prevent division by 0
            
        P = self.kP * error
        
        self.integral += error * deltaTime
        I = self.kI * self.integral
        
        derivative = (error - self.previousError) / deltaTime
        D = self.kD * derivative
        
        output = P + I + D
        
        # put max outputs here
        
        self.previousError = error
        self.previousTime = currentTime
        
        return output

"""
if __name__ == "__main__":
    pid = PID(
        kP = 1.0,
        kI = 0.1,
        kD = 0.05
    )
    
    currentValue = 0
    processValues = []
    controlOutputs = []
    timeSteps = []
    
    simulationTime = 10
    dt = 0.1
    
    for t in np.arange(0, simulationTime, dt):
        controlSignal = pid.compute(100, currentValue)
        
        currentValue += (controlSignal -currentValue) * dt
        
        processValues.append(currentValue)
        controlOutputs.append(controlSignal)
        timeSteps.append(t)
        
        time.sleep(dt)
        
    plt.figure(figsize=(12, 6))
    
    plt.subplot(2, 1, 1)
    plt.subplots_adjust(left = 0.15, bottom = 0.25) 
    plt.plot(timeSteps, processValues, label='Process Variable', color='b')
    plt.axhline(y=100, color='r', linestyle='--', label='Setpoint')
    plt.title('PID Controller Response')
    plt.xlabel('Time (s)')
    plt.ylabel('Process Variable')
    plt.legend()
    plt.grid()

    plt.subplot(2, 1, 2)
    plt.plot(timeSteps, controlOutputs, label='Control Output', color='g')
    plt.title('Control Output of PID Controller')
    plt.xlabel('Time (s)')
    plt.ylabel('Control Output')
    plt.legend()
    plt.grid()

    plt.tight_layout()
    plt.show()
"""