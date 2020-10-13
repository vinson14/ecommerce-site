import React from "react";
import { Col, Card, Button } from "react-bootstrap";

class ProductCard extends React.Component {
    deleteFromSelling = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: this.props.product.id,
                quantity: 1,
            }),
        };

        const response = await (
            await fetch("/products/delete", requestOptions)
        ).json();
    };

    render() {
        return (
            <Col md={4} className="py-3">
                <Card>
                    <Card.Img
                        variant="top"
                        src={require(`../static/img/shoes.jpg`)}
                    />
                    <Card.Body>
                        <Card.Title>
                            {this.props.product.product_name}
                        </Card.Title>
                        <Card.Text>
                            ${this.props.product.product_price}
                        </Card.Text>
                        <Card.Text>
                            Sold by: {this.props.product.seller_name}
                        </Card.Text>
                        {this.props.product.quantity_in_stock < 1 && (
                            <Card.Text>This product is out of stock</Card.Text>
                        )}
                        <Button onClick={this.deleteFromSelling}>Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default ProductCard;
