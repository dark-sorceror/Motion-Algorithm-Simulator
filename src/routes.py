from .PID import PID
from flask import Blueprint, jsonify, request, render_template

bp = Blueprint('bp', __name__)

@bp.route('/')
def index():
    return render_template('PID.html')

@bp.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    kP = float(data['kpValue'])
    kI = float(data['kiValue'])
    kD = float(data['kdValue'])
    friction = float(data['frictionValue'])

    robotPosList = PID(kP, kI, kD, 100, 0, 0.1, friction).simulate()

    return jsonify(
        { 
            'robot_position': robotPosList
        }
    )