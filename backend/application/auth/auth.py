from flask import Blueprint, request
from flask import current_app as app
from flask_login import login_required, logout_user, current_user, login_user, logout_user

from .. import login_manager
from ..models import db, User

# Blueprint configuration
auth_bp = Blueprint(
    'auth_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

# Adding routes
@auth_bp.route('/auth', methods=['GET'])
def auth():
    return { "message": "Success" }

@auth_bp.route('/auth/signup', methods=['POST'])
def auth_signup():
    user = User (
        username=request.form['username']
    )
    user.set_password(request.form['password'])
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return { "username" : request.form['username'], "password": request.form['password'] }

@auth_bp.route('/auth/login', methods=['POST'])
def auth_login():

    if current_user.is_authenticated:
        return { "message": "You are already logged in" }

    user = User.query.filter_by(username=request.form['username']).first()
    if user and user.check_password(password=request.form['password']):
        login_user(user)
        return { "logged in ": "true" }
    else:
        return { "logged in" : "false" }

@auth_bp.route('/auth/logout', methods=['POST'])
@login_required
def auth_logout():
    logout_user()
    return { "message": "You were logged out" }

@login_manager.user_loader
def load_user(user_id):
    if user_id is not None:
        return User.query.get(user_id)
    return None

@login_manager.unauthorized_handler
def unauthorized():
    return { "message": "You must be logged in to view here "}
