from flask import Blueprint, request
from flask import current_app as app
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

# Blueprint configuration
auth_bp = Blueprint(
    'auth_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

# Adding routes
@auth_bp.route('/auth', methods=['GET'])
def auth():
    SQLALCHEMY_DATABASE_URI = environ.get('DEV_DATABASE_URI')
    return { "message": SQLALCHEMY_DATABASE_URI }

@auth_bp.route('/auth/signup', methods=['POST'])
def auth_post():
    return { "username" : request.form['username'], "password": request.form['password'] }
