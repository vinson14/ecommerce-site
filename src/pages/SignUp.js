import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form action="/auth/signup" method="post">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Enter a username"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter a password"
                                />
                            </Form.Group>
                            <Button variant="outline-dark" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SignUp;
