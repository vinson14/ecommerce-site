import React from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";

import products from "../api/products.json";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            showToast: false,
        };
    }

    getProducts = async () => {
        const products = await (await fetch("/products")).json();
        this.setState({
            products: products.products,
        });
    };

    toggleToast = () => {
        this.setState({
            showToast: true,
        });
    };

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row className="justify-content-center py-3 m-3">
                    <Col>
                        <h1 className="text-center my-3">Shop</h1>
                        <Toast
                            onClose={() => this.setState({ showToast: false })}
                            show={this.state.showToast}
                            delay={3000}
                            autohide
                        >
                            <Toast.Body>Item has been added to cart</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <Row>
                    {this.state.products.map((product) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            toast={this.toggleToast}
                        />
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Shop;
