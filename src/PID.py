class PID:
    def __init__(self, kP, kI, kD, targetPos, currentPos, dt, friction):
        self.kP = kP
        self.kI = kI
        self.kD = kD
        
        self.targetPos = targetPos
        self.currentPos = currentPos
        
        self.dt = dt
        
        self.friction = friction
        
        self.prevError = 0
        self.integral = 0
        self.prevDerivative = 0
        
        self.robotPosition = [0]

    def compute(self):
        error = self.targetPos - self.currentPos
        
        P = error * self.kP
        
        self.integral += error * self.dt
        I = self.integral * self.kI
        
        alpha = 0.1  # Smoothing factor (between 0 and 1)
        derivative = alpha * ((error - self.prevError) / self.dt) + (1 - alpha) * self.prevDerivative # To clamp down d value
        self.prevDerivative = derivative
        D = derivative * self.kD

        self.prevError = error
        
        return (P + I + D - self.friction)
    
    def simulate(self, steps = 100):
        velocity = 0

        for step in range(steps):
            velocity = self.compute()
            self.currentPos += velocity * self.dt

            self.robotPosition.append(self.currentPos)

        return self.robotPosition
    
    def findIntersect(self):
        for i in range(len(self.robotPosition)):
            if abs(self.robotPosition[i] - 100) <= 1:
                stabilizedIndex = i

                if all(abs(self.robotPosition[j] - 100) <= 1 for j in range(i, len(self.robotPosition))):
                    return stabilizedIndex
            
        return None
        
# Virtual Environemnt (Local Running) stuff

# import matplotlib.pyplot as plt
# from matplotlib.widgets import Button, TextBox, RangeSlider
# import numpy as np
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