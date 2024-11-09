from flask import request, jsonify

from . import api_bp

from simulations.PID import PID
from simulations.WaypointGeneration import generateWayPath, convertToJSFormat

@api_bp.route('/pid', methods = [ 'POST' ])
def dataExchange():
    data = request.get_json()
    
    simType = data['type']

    if simType == 'pid':
        kP, kI, kD, friction = float(data['kpValue']), float(data['kiValue']), float(data['kdValue']), float(data['frictionValue'])
        
        pidObj = PID(kP, kI, kD, 100, 0, 0.1, friction)
        robotPosList = pidObj.simulate()
        intersect = pidObj.findIntersect() if robotPosList else 0

        toJson = {
            'type': data['type'],
            'robot_position': robotPosList,
            'intersect': intersect
        }

    elif simType == 'waypoint-generation':
        spacing, b = float(data['spacingValue']), float(data['bValue'])
        
        wpgObj = generateWayPath([(0, 3), (1, 3), (2, 3), (3, 2), (4, 1), (5, 0)], spacing, 1 - b, b, 0.001)
        
        PIAlist = wpgObj.pointInjectionAlgorithm()
        PSAlist = wpgObj.pathSmoothingAlgorithm()
        
        PIAlist = convertToJSFormat(PIAlist)
        PSAlist = convertToJSFormat(PSAlist)
        
        toJson = {
            'type': data['type'],
            'PIA_list': PIAlist,
            'PSA_list': PSAlist
        }
        
    return jsonify(toJson), 201