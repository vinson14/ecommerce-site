from flask import Blueprint, request
from flask import current_app as app
from flask_login import current_user, login_required

from ..models import db, Product, Cart, User, Order, PurchaseHistory

cart_bp = Blueprint(
    'cart_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@cart_bp.route('/cart/add', methods=['POST'])
@login_required
def add_cart():

    req_data = request.get_json()

    cart_item = Cart.query.filter_by(
        user_id=current_user.id, product_id=req_data['product_id']).first()

    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = Cart(
            user_id=current_user.id,
            product_id=req_data['product_id'],
            quantity=1
        )

    db.session.add(cart_item)
    db.session.commit()

    return {"success": True}


@cart_bp.route('/cart/get', methods=['GET'])
@login_required
def get_cart():

    cart_items = [
        {
            "id": item.id,
            "product_id": item.product_id,
            "product_name": item.product.product_name,
            "product_price": item.product.product_price,
            "quantity": item.quantity
        }
        for item in Cart.query.filter_by(
            user_id=current_user.id
        )
    ]

    return {"cart": cart_items}


@cart_bp.route('/cart/delete', methods=['POST'])
@login_required
def delete_item():

    req_data = request.get_json()
    item = Cart.query.get(req_data['cart_id'])
    db.session.delete(item)
    db.session.commit()
    return {"message": "deleted"}


@cart_bp.route('/cart/checkout', methods=['GET'])
@login_required
def checkout():

    cart_items = Cart.query.filter_by(
        user_id=current_user.id
    )

    total_cost = sum([
        item.quantity * item.product.product_price
        for item in cart_items
    ])

    new_order = Order(
        user_id=current_user.id,
        total_cost=total_cost
    )

    db.session.add(new_order)
    db.session.commit()

    order_id = Order.query.first().id

    for item in cart_items:
        history_item = PurchaseHistory(
            product_id=item.product_id,
            quantity=item.quantity,
            order_id=order_id
        )
        db.session.add(history_item)
        db.session.delete(item)
    db.session.commit()
    return {"success": True}
