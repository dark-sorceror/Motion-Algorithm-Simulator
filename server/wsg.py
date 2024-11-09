from src import App
import os

config_name = os.getenv('FLASK_CONFIG', 'development')
app = App(config_name)

if __name__ == '__main__':
    app.run()