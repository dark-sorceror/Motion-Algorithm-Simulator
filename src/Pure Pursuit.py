# GET 3 point coordinates from js
# use these 3 points and numpy to calculate equation of parabola
# divide the parabola into discrete points using numpy
# POST a list of these points to js to plot on canvas

tpl = [(1, 1), (2, 2), (3, 3)] # replace later

import numpy as np

def getParabolaEquation(points):
    return np.polyfit(zip(*points)[0], zip(*points)[1], len(points) - 1)

def discretePoints(points):
    xRange = np.linspace(min(zip(*points)[0]), max(zip(*points)[0]), 10)
    yRange = np.poly1d(getParabolaEquation(points))(xRange)
    return xRange, yRange

class PurePursuit:
    def __init__(self, robotPosition, robotHeading, lookAheadDistance, wheelBase):
        self.robotX = robotPosition[0]
        self.robotY = robotPosition[1]
        self.robotHeading = robotHeading
        
        self.lookAheadDistance = lookAheadDistance
        self.wheelBase = wheelBase
        
    def getEuclideanDistance(point1, point2):
        return np.linalg.norm(point1 - point2)
    
    def findLookAheadPoint(pathPoints):
        for i in range(len(pathPoints) - 1):
            pass







