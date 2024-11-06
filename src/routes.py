VERSION = "1.5.5"

from .PID import PID
from .WaypointGeneration import convertToJSFormat, pointInjectionAlgorithm, pathSmoothingAlgorithm
from flask import Blueprint, jsonify, request, render_template

bp = Blueprint('bp', __name__)

def getSliders(configType):
    if configType == 'PID':
        return [
            {"label": "P Value:", "id": "kp", "min": 0, "max": 5, "step": 0.1, "value": 1},
            {"label": "I Value:", "id": "ki", "min": 0, "max": 5, "step": 0.1, "value": 0},
            {"label": "D Value:", "id": "kd", "min": 0, "max": 5, "step": 0.1, "value": 0},
            {"label": "Friction Value:", "id": "friction", "min": 0, "max": 10, "step": 0.1, "value": 0},
        ]
    elif configType == 'WPG':
        return [
            {"label": "Spacing:", "id": "spacing", "min": 0.1, "max": 1, "step": 0.1, "value": 1},
            {"label": "b:", "id": "b", "min": 0.05, "max": 0.95, "step": 0.05, "value": 0.75},
        ]

@bp.route('/dataEx', methods=['POST'])
def dataExchange():
    data = request.json
    simType = data['type']

    if simType == 'pid':
        kP, kI, kD, friction = float(data['kpValue']), float(data['kiValue']), float(data['kdValue']), float(data['frictionValue'])
        
        pidobj = PID(kP, kI, kD, 100, 0, 0.1, friction)
        robotPosList = pidobj.simulate()
        intersect = pidobj.findIntersect() if robotPosList else 0

        toJson = {
            'type': data['type'],
            'robot_position': robotPosList,
            'intersect': intersect
        }

    elif simType == 'waypoint-generation':
        spacing, b = float(data['spacingValue']), float(data['bValue'])
        
        PIAlist = pointInjectionAlgorithm([(0, 3), (1, 3), (2, 3), (3, 2), (4, 1), (5, 0)], spacing)
        PSAlist = convertToJSFormat(pathSmoothingAlgorithm(PIAlist, 1 - b, b, 0.001))
        PIAlist = convertToJSFormat(PIAlist)
        
        toJson = {
            'type': data['type'],
            'PIA_list': PIAlist,
            'PSA_list': PSAlist
        }
        
    return jsonify(toJson)

@bp.route('/', methods=['GET'])
def index():
    return render_template(
        'index.html', 
        VERISON=VERSION
    )

@bp.route('/pid', methods=['GET'])
def pidSimulation():
    sliders = getSliders('PID')
    
    return render_template(
        'simulation.html', 
        TITLE = "PID Controller", 
        sliders = sliders,
        VERSION = VERSION
    )

@bp.route('/waypoint-generation', methods=['GET'])
def waypointGenerationSimulation():
    sliders = getSliders('WPG')
    
    return render_template(
        'simulation.html', 
        TITLE = "Way Point Generation", 
        sliders = sliders, 
        VERSION = VERSION
    )

@bp.route('/pure-pursuit', methods=['GET'])
def purePursuitSimulation():
    return render_template(
        'temp.html', 
        VERSION = VERSION
    )

@bp.route('/odometry', methods=['GET'])
def odometrySimulation():
    return render_template(
        'temp.html', 
        VERSION = VERSION
    )