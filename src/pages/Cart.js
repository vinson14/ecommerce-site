import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import CartTable from "../components/CartTable";

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            totalCost: "",
        };
    }

    getCart = async () => {
        const cart = await (await fetch("/cart/get")).json();

        this.setState({
            cart: cart.cart,
        });
    };

    deleteProduct = async (cart_id) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cart_id: cart_id,
            }),
        };
        await fetch("/cart/delete", requestOptions);
        const cart = await (await fetch("/cart/get")).json();
        this.setState({
            cart: cart.cart,
        });
    };

    checkOut = async () => {
        let res = await (await fetch("/cart/checkout")).json();
        if (!res.status) {
            alert(res.message);
        }
        const cart = await (await fetch("/cart/get")).json();
        this.setState({
            cart: cart.cart,
        });
    };

    componentDidMount() {
        this.getCart();
    }

    render() {
        if (this.state.cart && this.state.cart.length !== 0) {
            return (
                <div className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col>
                                <h1 className="text-center">Cart</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CartTable
                                    cart={this.state.cart}
                                    deleteProduct={this.deleteProduct}
                                />
                            </Col>
                        </Row>
                        {this.state.cart && this.state.cart.length !== 0 && (
                            <Row>
                                <Col className="d-flex justify-content-center p-3">
                                    <Button
                                        onClick={this.checkOut}
                                        variant="outline-dark"
                                    >
                                        Check out
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </div>
            );
        } else {
            return (
                <div className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col>
                                <h1 className="text-center p-5">
                                    Your cart is empty
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default Cart;
