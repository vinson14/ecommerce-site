from flask import Blueprint, jsonify, request
from flask import current_app as app
from flask_login import current_user, login_required

from ..models import db, Product

# Blueprint config
products_bp = Blueprint(
    'products_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@products_bp.route('/products', methods=['GET'])
def products():

    products = [
        {
            "id": product.id,
            "product_name": product.product_name,
            "product_price": product.product_price,
            "seller_id": product.seller_id,
            "seller_name": product.seller.username,
            "quantity_in_stock": product.quantity_in_stock
        }
        for product in Product.query.all()
    ]

    return {"products": products}


@products_bp.route('/products/seller', methods=['GET'])
def seller_products():

    products = [
        {
            "id": product.id,
            "product_name": product.product_name,
            "product_price": product.product_price,
            "seller_id": product.seller_id,
            "seller_name": product.seller.username,
            "quantity_in_stock": product.quantity_in_stock
        }
        for product in Product.query.filter_by(seller_id=current_user.id).all()
    ]

    return {"products": products}


@products_bp.route('/products/delete', methods=['POST'])
@login_required
def delete_product():

    req_data = request.get_json()

    cart_item = Product.query.filter_by(
        seller_id=current_user.id, id=req_data['product_id']).first()

    db.session.delete(cart_item)
    db.session.commit()

    return {"success": True}

@products_bp.route('/products/add', methods=['POST'])
@login_required
def add_product():

    req_data = request.get_json()

    new_product = Product(
        product_name=req_data['product_name'],
        product_price=req_data['product_price'],
        quantity_in_stock=req_data['quantity'],
        seller_id=current_user.id
    )

    db.session.add(new_product)
    db.session.commit()

    return {"success": True, "message": "Product successfully listed for sale"}
    