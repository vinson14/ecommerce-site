import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { isCompositeComponent } from "react-dom/test-utils";

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            totalCost: "",
        };
    }

    getTotalCost = (cart) => {
        let totalCost = 0;

        for (let i = 0; i < cart.length; i++) {
            totalCost += cart[i].quantity * cart[i].product_price;
        }

        return totalCost;
    };

    getCart = async () => {
        const cart = await (await fetch("/cart/get")).json();

        this.setState({
            cart: cart.cart,
            totalCost: this.getTotalCost(cart.cart),
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
            totalCost: this.getTotalCost(cart.cart),
        });
    };

    componentDidMount() {
        this.getCart();
    }

    render() {
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
                            <Table borderless>
                                <thead className="text-center">
                                    <tr>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="text-center"
                                        >
                                            <td>{item.product_name}</td>
                                            <td>{item.product_price}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {item.quantity *
                                                    item.product_price}
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={(e) =>
                                                        this.deleteProduct(
                                                            item.id,
                                                            e
                                                        )
                                                    }
                                                    variant="outline-dark"
                                                    className="mx-3"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="text-right font -
                                     weight-bold"
                                        >
                                            Total Price:
                                        </td>
                                        <td className="text-center">
                                            {this.state.totalCost}
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Cart;
