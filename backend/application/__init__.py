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
        from .products import products
        from .auth import auth
        from .cart import cart
        from .orders import orders

        # Register Blueprints
        app.register_blueprint(products.products_bp)
        app.register_blueprint(auth.auth_bp)
        app.register_blueprint(cart.cart_bp)
        app.register_blueprint(orders.orders_bp)

        # Create Database Models
        # db.create_all()

        return app
