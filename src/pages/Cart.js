import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class Cart extends React.Component {
    render() {
        return (
            <div className="h-100">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">Cart</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Cart;
