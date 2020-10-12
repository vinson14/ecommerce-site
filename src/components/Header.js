import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <Navbar className="fixed-top">
                <Image
                    src={require("../static/img/shoes.jpg")}
                    width="50px"
                    fluid
                />
                <Nav className="ml-auto">
                    <NavLink className="mx-3" exact to="/">Home</NavLink>
                    <NavLink className="mx-3" to="/shop">Shop</NavLink>
                    <NavLink className="mx-3" to="/cart">Cart</NavLink>
                    <NavLink className="mx-3" to="/signup">Sign Up</NavLink>
                    <NavLink className="mx-3" to="/orders">Orders</NavLink>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
