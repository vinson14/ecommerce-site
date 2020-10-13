import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserForm from "../components/UserForm";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
        };
    }

    isLoggedIn = async () => {
        let res = await (await fetch("/auth/checklogin")).json();
        this.setState({
            loggedIn: res.loggedIn,
        });
    };
    componentDidMount() {
        this.isLoggedIn();
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps ) {
            this.isLoggedIn();
        }
    }

    render() {
        console.log("login page render");
        if (this.state.loggedIn) {
            return (
                <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                    <Row>
                        <Col className="p-5">
                            <h1>You are logged in</h1>
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row>
                    <Col className="p-5">
                        <UserForm button="Login" isLoggedIn={this.isLoggedIn}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
