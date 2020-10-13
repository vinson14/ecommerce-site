import React from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";

import ProductCard from "../components/ProductCard";

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            showToast: false,
            loggedIn: false,
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

    isLoggedIn = async () => {
        let res = await (await fetch("/auth/checklogin")).json();
        this.setState({
            loggedIn: res.loggedIn,
        });
    };

    componentDidMount() {
        this.getProducts();
        this.isLoggedIn();
    }

    render() {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row className="justify-content-center py-3 m-3">
                    <Col>
                        <h1 className="text-center my-3">Shop</h1>
                        {!this.state.isLoggedIn && (
                            <h3 className="text-center my-3">
                                You must be logged in to add to cart
                            </h3>
                        )}
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
