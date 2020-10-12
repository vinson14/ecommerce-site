from flask import Blueprint
from flask import current_app as app

from .. models import db, User, Product, Seller, Cart

# Blueprint configuration
home_bp = Blueprint(
    'home_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

# Adding routes
@home_bp.route('/backend', methods=['GET'])
def home():
    """Homepage."""
    return { "message": "testing" }
