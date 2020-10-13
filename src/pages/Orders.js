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
    };

    componentDidMount() {
        this.getOrders();
    }

    render() {
        let yourOrders;

        if (this.state.orders) {
            yourOrders = this.state.orders.map((order) => (
                <Table className="my-5" key={order.id}>
                    <thead>
                        <tr>
                            <th>Order No.: {order.id}</th>
                            <th>Total Price: {order.total_cost}</th>
                            <th>Date and Time: {order.datetime}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ));
        }

        return (
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row className="my-5">
                    <Col>
                        <h1>Orders</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>{yourOrders}</Col>
                </Row>
            </Container>
        );
    }
}

export default Orders;
