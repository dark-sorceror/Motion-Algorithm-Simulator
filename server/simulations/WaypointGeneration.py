import numpy as np

def convertToJSFormat(list: list):
    newList = []
    
    for i in range(len(list)):
        newList.append({'x': list[i][0], 'y': list[i][1]})
            
    return newList

class generateWayPath:
    def __init__(
        self, 
        pathPoints: list[tuple], 
        spacing: int, 
        a: float, 
        b: float, 
        tolerance: float
    ):
        self.pathPoints = pathPoints
        
        self.spacing = spacing
        
        self.a = a
        self.b = b
        self.tolerance = tolerance

    #Point Injection Algorithm
    def pointInjectionAlgorithm(self):
        newPathPoints = []

        for i in range(len(self.pathPoints) - 1):
            endPoint = np.array(self.pathPoints[i + 1], dtype = float)
            startPoint = np.array(self.pathPoints[i], dtype = float)
            
            vector = endPoint - startPoint
            
            numPointsThatFit = int(np.linalg.norm(vector) / (self.spacing if self.spacing > 0 else 1))
            unitOfVector = vector / (numPointsThatFit if numPointsThatFit > 0 else 1)
            
            for j in range(round(numPointsThatFit if numPointsThatFit > 0 else 1)):
                newPathPoints.append(tuple((self.pathPoints[i] + unitOfVector * j).tolist()))
                
        newPathPoints.append(tuple(self.pathPoints[-1]))
        
        self.pathPoints = newPathPoints
        
        return newPathPoints

    # Path Smoothing Algorithm
    def pathSmoothingAlgorithm(self):
        pathPoints = np.array(self.pathPoints, dtype=float)
        origPathPoints = np.copy(pathPoints)
        
        change = self.tolerance
        
        while (change >= self.tolerance):
            change = 0.0
            
            for i in range(1, len(pathPoints) - 1):
                for j in range(len(pathPoints[i])):
                    aux = origPathPoints[i][j]
                    
                    origPathPoints[i][j] += self.a * (pathPoints[i][j] - origPathPoints[i][j]) + self.b * \
                                            (origPathPoints[i-1][j] + origPathPoints[i+1][j] - 2.0 * origPathPoints[i][j])
                    
                    change += abs(aux - origPathPoints[i][j])
                    
        return [tuple(point.tolist()) for point in origPathPoints]