from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    """Initialize the core application. """
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.DevConfig')

    # Initialize the plugins to app
    db.init_app(app)
    login_manager.init_app(app)

    # Creating the app context
    with app.app_context():

        # Import routes
        from .home import home
        from .auth import auth

        # Register Blueprints
        app.register_blueprint(home.home_bp)
        app.register_blueprint(auth.auth_bp)

        # Create Database Models
        db.create_all()
        print('hello')

        return app
