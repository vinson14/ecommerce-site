"""Database models."""
from . import db
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    """User account model."""

    __tablename__ = "users"
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        nullable=False,
        unique=True
    )

    password = db.Column(
        db.String(200),
        primary_key=False,
        unique=False,
        nullable=False
    )

    cart = db.relationship('Cart', backref='user', lazy=True)

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(
            password,
            method='sha256'
        )

    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"User {self.username}"


class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    product_name = db.Column(
        db.String(100),
        nullable=False,
        unique=False
    )

    product_price = db.Column(
        db.Integer,
        nullable=False,
        unique=False
    )

    seller_id = db.Column(
        db.Integer,
        db.ForeignKey('sellers.id'),
        nullable=False
    )

    cart = db.relationship('Cart', backref='product', lazy=True)


class Seller(db.Model):

    __tablename__ = "sellers"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    seller_name = db.Column(
        db.String(100),
        nullable=False,
        unique=True
    )

    seller_password = db.Column(
        db.String(200),
        nullable=False,
        unique=False
    )

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(
            password,
            method='sha256'
        )

    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)

    products = db.relationship('Product', backref='seller', lazy=True)


class Cart(db.Model):

    __tablename__ = "cart"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey('products.id'),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )


class Order(db.Model):

    __tablename__ = "orders"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )

    total_cost = db.Column(
        db.Integer,
        nullable=False
    )

    datetime = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now()
    )

    purchase_history = db.relationship(
        'PurchaseHistory', backref='order', lazy=True)


class PurchaseHistory(db.Model):

    __tablename__ = "purchasehistory"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey('products.id'),
        nullable=False
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey('orders.id')
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )
