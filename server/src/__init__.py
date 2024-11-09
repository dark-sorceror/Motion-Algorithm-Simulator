from flask import Flask
from flask_cors import CORS

from api import api_bp
from .config import config

def App(config_name = 'development'):
    app = Flask(__name__, static_folder = 'build', static_url_path = '')
    CORS(app)
    
    app.config.from_object(config[config_name])
    
    app.register_blueprint(api_bp, url_prefix = '/api')
    
    return app