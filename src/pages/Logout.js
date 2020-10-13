import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class Logout extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: true,
        };
    }

    logOutUser = async () => {
        let res = await (await fetch("/auth/logout")).json();
        if (res.status) {
            this.setState({
                loggedIn: false,
            });
        }
    };

    componentDidMount() {
        this.logOutUser();
        console.log(this.state.loggedIn)
    }

    render() {
        return (
            <Container className="d-flex flex-column h-100 justify-content-center align-items-center">
                <Row>
                    <Col>
                        <h1>You are logged out</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Logout;
