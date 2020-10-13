import React from "react";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
            showToast: false,
            toastMsg: "",
            disableButton: true,
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

    handleSignUp = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };
        let res = await (await fetch("/auth/signup", requestOptions)).json();
        if (!res.status) {
            this.toggleToast();
            this.setState({
                toastMsg: res.message,
            });
        } else {
            this.setState({
                loggedIn: true,
            });
        }
    };

    isLoggedIn = async () => {
        let res = await (await fetch("/auth/checklogin")).json();
        this.setState({
            loggedIn: res.loggedIn,
        });
    };

    toggleToast = () => {
        this.setState({
            showToast: true,
        });
    };

    componentDidMount() {
        this.isLoggedIn();
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                    <Row>
                        <Col>
                            <h1>You are logged in</h1>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                    <Row>
                        <Col className="p-5">
                            <Form onSubmit={this.handleSignUp}>
                                <Form.Group>
                                    <Form.Control
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Button variant="outline-dark" type="submit">
                                    Sign up
                                </Button>
                            </Form>
                            <Toast
                                onClose={() =>
                                    this.setState({ showToast: false })
                                }
                                show={this.state.showToast}
                                delay={3000}
                                autohide
                                className="my-3"
                            >
                                <Toast.Body>{this.state.toastMsg}</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default SignUp;
