import React from "react";
import { Form, Button, Toast } from "react-bootstrap";

class UserForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            showToast: false,
            toastMsg: "",
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
                username: this.state.username,
                password: this.state.password,
            }),
        };

        let res = await (await fetch("/auth/login", requestOptions)).json();
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

    toggleToast = () => {
        this.setState({
            showToast: true,
        });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
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
                    {this.props.button}
                </Button>
                <Toast
                    onClose={() => this.setState({ showToast: false })}
                    show={this.state.showToast}
                    delay={3000}
                    autohide
                    className="my-3"
                >
                    <Toast.Body>{this.state.toastMsg}</Toast.Body>
                </Toast>
            </Form>
        );
    }
}

export default UserForm;
