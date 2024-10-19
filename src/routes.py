import time
import numpy as np
from .PID import PID
from flask import Blueprint, jsonify, request, render_template

main = Blueprint('main', __name__)

def pid_controller(targetValue, kP, numSteps=100):
    currentValue = 0
    outputValues = []
    
    for step in range(numSteps):
        error = targetValue - currentValue
        
        adjustment = kP * error
        currentValue += adjustment 
        outputValues.append(currentValue)
    
    return outputValues

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/pid', methods=['POST'])
def pid():
    data = request.json
    p_value = data.get('p_value', 1)
    targetValue = 100
    numSteps = 100

    output_values = pid_controller(targetValue, p_value, numSteps)
    
    return jsonify(
        { 'output_values': output_values }
    )