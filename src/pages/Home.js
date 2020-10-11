import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/Header";

import "../static/css/home.css";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
    }

    getData = () => {
        fetch("/backend")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    message: data.message,
                });
            });
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <Container className="h-100 align-items-center d-flex flex-column justify-content-center">
                <Header />
                <Row>
                    <Col>
                        <div className="p-5">
                            <h1 className="text-center">
                                What are you looking for today?
                                {this.state.message}
                            </h1>
                            <Form className="my-5">
                                <Form.Group>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search for a product"
                                        className="text-center"
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
