from .PID import PID
from .WaypointGeneration import pointInjectionAlgorithm
from flask import Blueprint, jsonify, request, render_template

bp = Blueprint('bp', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/pid')
def pidSimulation():
    return render_template('PID.html')

@bp.route('/waypoint-generation')
def waypointGeneration():
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
    PIAlist = pointInjectionAlgorithm([(0, 0), (1, 1), (2, 0.5)], spacing)
    
    return jsonify(
        { 
            'robot_position': robotPosList,
            'intersect': intersect,
            'PIA_list': PIAlist
        }
    )