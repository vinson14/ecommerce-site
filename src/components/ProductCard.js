import React from "react";
import { Col, Card, Button } from "react-bootstrap";

class ProductCard extends React.Component {
    render() {
        return (
            <Col md={4} className="py-3">
                <Card>
                    <Card.Img variant="top" src={require(`../static/img/${this.props.product.image_name}`)} />
                    <Card.Body>
                        <Card.Title>
                            {this.props.product.product_name}
                        </Card.Title>
                        <Card.Text>{this.props.product.description}</Card.Text>
                        <Button>Add to cart</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default ProductCard;
