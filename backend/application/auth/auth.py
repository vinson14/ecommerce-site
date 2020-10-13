from flask import Blueprint, request
from flask import current_app as app
from flask_login import login_required, logout_user, current_user, \
    login_user, logout_user

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
    return {"message": "Success"}


@auth_bp.route('/auth/signup', methods=['POST'])
def auth_signup():
    req_data = request.get_json()
    user_exists = User.query.filter_by(username=req_data['username']).first()
    if user_exists:
        print('user exists')
        return {"status": False,
                "message": "Username already exists, \
                    please choose another username"}
    user = User(
        username=req_data['username']
    )
    user.set_password(req_data['password'])
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return {"status": True, "message": "Account created"}


@auth_bp.route('/auth/checklogin', methods=['GET'])
def check_login():
    return {"loggedIn": current_user.is_authenticated}


@auth_bp.route('/auth/login', methods=['POST'])
def auth_login():

    if current_user.is_authenticated:
        return {"status": False, "message": "You are already logged in"}

    req_data = request.get_json()
    user = User.query.filter_by(username=req_data['username']).first()

    if user and user.check_password(password=req_data['password']):
        login_user(user)
        return {"status": True}
    else:
        return {"status": False, "message": "Wrong username/password"}


@auth_bp.route('/auth/logout', methods=['GET'])
@login_required
def auth_logout():
    logout_user()
    print(current_user.is_authenticated)
    return {"status": True}


@login_manager.user_loader
def load_user(user_id):
    if user_id is not None:
        return User.query.get(user_id)
    return None


@login_manager.unauthorized_handler
def unauthorized():
    return {"message": "You must be logged in to view here "}
