from flask import Blueprint, request
from flask import current_app as app
from flask_login import current_user

from ..models import db, Product, Cart, User

cart_bp = Blueprint(
    'cart_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@cart_bp.route('/cart/add', methods=['POST'])
def add_cart():

    req_data = request.get_json()
    new_cart_item = Cart(
        user_id=current_user.id,
        product_id=req_data['product_id'],
        quantity=1
    )

    db.session.add(new_cart_item)
    db.session.commit()

    return {"success": True}
