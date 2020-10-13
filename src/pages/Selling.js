import React from "react";
import { Container, Row, Col, Form, Toast, Button } from "react-bootstrap";

import SellingProductCard from "../components/SellingProductCard";

class Selling extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            loggedIn: false,
            showToast: false,
            productName: "",
            productPrice: "",
            productQuantity: "",
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_name: this.state.productName,
                product_price: this.state.productPrice,
                quantity: this.state.productPrice,
            }),
        };

        let res = await (await fetch("/products/add", requestOptions)).json();
        if (!res.status) {
            this.toggleToast();
            this.setState({
                toastMsg: res.message,
            });
        } else {
            this.setState({
                loggedIn: true,
            });
            this.props.isLoggedIn();
        }
    };

    isLoggedIn = async () => {
        let res = await (await fetch("/auth/checklogin")).json();
        this.setState({
            loggedIn: res.loggedIn,
        });
    };

    getProducts = async () => {
        const products = await (await fetch("/products/seller")).json();
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
        this.isLoggedIn();
    }

    render() {
        if (!this.state.loggedIn) {
            return <h1>You must be logged in to view this page</h1>;
        } else {
            return (
                <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                    <Row>
                        {this.state.products.map((product) => (
                            <SellingProductCard
                                product={product}
                                key={product.id}
                                toast={this.toggleToast}
                            />
                        ))}
                    </Row>
                    <Row className="my-5">
                        <Col className="p-5">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Control
                                        name="productName"
                                        type="text"
                                        placeholder="Product Name"
                                        value={this.state.productName}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name="productPrice"
                                        type="number"
                                        placeholder="Product Price"
                                        value={this.state.productPrice}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name="productQuantity"
                                        type="number"
                                        placeholder="Quantity"
                                        value={this.state.productQuantity}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Button variant="outline-dark" type="submit">
                                    List product for sale
                                </Button>
                                <Toast
                                    onClose={() =>
                                        this.setState({ showToast: false })
                                    }
                                    show={this.state.showToast}
                                    delay={3000}
                                    autohide
                                    className="my-3"
                                >
                                    <Toast.Body>
                                        {this.state.toastMsg}
                                    </Toast.Body>
                                </Toast>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Selling;
