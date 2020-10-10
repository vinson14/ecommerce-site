import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import products from "../api/products.json";
import ProductCard from "../components/ProductCard";

class Shop extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-center py-3">
                        <Col>
                            <h1 className="text-center">Shop</h1>
                        </Col>
                    </Row>
                    <Row>
                        {products.products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Shop;
