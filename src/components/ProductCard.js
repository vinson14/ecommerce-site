import React from "react";
import { Col, Card, Button } from "react-bootstrap";

class ProductCard extends React.Component {
    addToCart = async () => {
        console.log(this.props.product.seller_id);
        console.log(this.props.product.id);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: this.props.product.id,
                quantity: 1
            }),
        };

        const response = await (
            await fetch("/cart/add", requestOptions)
        ).json();
        console.log(response);
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
                        <Button onClick={this.addToCart}>Add to cart</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default ProductCard;
