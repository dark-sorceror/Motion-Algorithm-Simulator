from .PID import PID
from .WaypointGeneration import convertToJSFormat, pointInjectionAlgorithm, pathSmoothingAlgorithm
from flask import Blueprint, jsonify, request, render_template

bp = Blueprint('bp', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/pid')
def pidSimulation():
    return render_template('PID.html')

@bp.route('/pure-pursuit')
def purePursuitSimulation():
    return render_template('Pure Pursuit.html')

@bp.route('/odometry')
def odometrySimulation():
    return render_template('Odometry.html')

@bp.route('/waypoint-generation')
def waypointGenerationSimulation():
    return render_template('WPG.html')

@bp.route('/dataEx', methods=['POST'])
def dataExchange():
    data = request.json
    
    kP = float(data['kpValue'])
    kI = float(data['kiValue'])
    kD = float(data['kdValue'])
    friction = float(data['frictionValue'])
    pidobj = PID(kP, kI, kD, 100, 0, 0.1, friction)
    robotPosList = pidobj.simulate()
    intersect = pidobj.findIntersect() if robotPosList else 0
    
    spacing = float(data['spacingValue']) 
    PIAlist = pointInjectionAlgorithm([(0, 3), (1, 3), (2, 3), (3, 2), (4, 1), (5, 0)], spacing)
    
    b = float(data['bValue']) 
  
    PSAlist = convertToJSFormat(pathSmoothingAlgorithm(PIAlist, 1 - b, b, 0.001))
    
    PIAlist = convertToJSFormat(PIAlist)
    
    return jsonify(
        { 
            'robot_position': robotPosList,
            'intersect': intersect,
            'PIA_list': PIAlist,
            'PSA_list': PSAlist
        }
    )