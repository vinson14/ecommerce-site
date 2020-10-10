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
                    <NavLink className="px-3" to="/">Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/">About</NavLink>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
