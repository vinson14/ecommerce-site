from flask import Blueprint
from flask import current_app as app
from flask_login import current_user, login_required

from .. models import db, Order, PurchaseHistory

orders_bp = Blueprint(
    'orders_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@orders_bp.route('/orders/all', methods=['GET'])
@login_required
def orders_all():

    orders = [
        {
            "id": order.id,
            "total_cost": order.total_cost,
            "datetime": order.datetime,
            "items": [
                {
                    "product_id": item.product_id,
                    "quantity": item.quantity
                }
                for item in order.purchase_history
            ]
        }
        for order in Order.query.filter_by(user_id=current_user.id).all()
    ]

    return {"orders": orders}
