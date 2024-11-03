import numpy as np

def convertToJSFormat(list: list):
    newList = []
    
    for i in range(len(list)):
        newList.append({'x': list[i][0], 'y': list[i][1]})
            
    return newList

#Point Injection Algorithm
def pointInjectionAlgorithm(pathPoints: list[tuple], spacing: int = 1):
    newPathPoints = []

    for i in range(len(pathPoints) - 1):
        endPoint = np.array(pathPoints[i + 1], dtype = float)
        startPoint = np.array(pathPoints[i], dtype = float)
        
        vector = endPoint - startPoint
        
        numPointsThatFit = int(np.linalg.norm(vector) / (spacing if spacing > 0 else 1))
        unitOfVector = vector / (numPointsThatFit if numPointsThatFit > 0 else 1)
        
        for j in range(round(numPointsThatFit if numPointsThatFit > 0 else 1)):
            newPathPoints.append(tuple((pathPoints[i] + unitOfVector * j).tolist()))
            
    newPathPoints.append(tuple(pathPoints[-1]))
    
    return newPathPoints

# Path Smoothing Algorithm
def pathSmoothingAlgorithm(pathPoints: list[tuple], a: float, b: float, tolerance: float):
    pathPoints = np.array(pathPoints, dtype=float)
    origPathPoints = np.copy(pathPoints)
    
    change = tolerance
    
    while (change >= tolerance):
        change = 0.0
        
        for i in range(1, len(pathPoints) - 1):
            for j in range(len(pathPoints[i])):
                aux = origPathPoints[i][j]
                
                origPathPoints[i][j] += a * (pathPoints[i][j] - origPathPoints[i][j]) + b * \
                                        (origPathPoints[i-1][j] + origPathPoints[i+1][j] - 2.0 * origPathPoints[i][j])
                
                change += abs(aux - origPathPoints[i][j])
                
    return [tuple(point.tolist()) for point in origPathPoints]