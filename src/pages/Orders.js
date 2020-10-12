import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
        };
    }

    getOrders = async () => {
        const orders = await (await fetch("/orders/all")).json();
        this.setState({
            orders: orders.orders,
        });
        console.log(this.state.orders);
    };

    componentDidMount() {
        this.getOrders();
    }

    render() {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row className="my-5">
                    <Col>
                        <h1>Orders</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Order No.</th>
                                    <th>Total Cost</th>
                                    <th>Date and Time</th>
                                    <th>Products</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.total_cost}</td>
                                        <td>{order.datetime}</td>
                                        <td>{order.items[0].product_id}</td>
                                        <td>{order.items[0].quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Orders;
