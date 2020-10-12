from flask import Blueprint, jsonify
from flask import current_app as app

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
            "seller_name": product.seller.seller_name
        }
        for product in Product.query.all()
    ]

    return {"products": products}
