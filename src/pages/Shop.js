import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import products from "../api/products.json";
import ProductCard from "../components/ProductCard";

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    getProducts = async () => {
        const products = await (await fetch("/products")).json();
        this.setState(
            {
                products: products.products
            }
        )
    };

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-center py-3">
                        <Col>
                            <h1 className="text-center">Shop</h1>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.products.map(product => (
                            <ProductCard product={product} key={product.id}/>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Shop;
