import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
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

    render() {
        let logInLogOut;

        if (this.state.loggedIn) {
            logInLogOut = (
                <NavLink className="mx-3" to="/logout">
                    Log Out
                </NavLink>
            );
        } else {
            logInLogOut = (
                <NavLink className="mx-3" to="/login">
                    Log In
                </NavLink>
            );
        }

        return (
            <Navbar className="fixed-top">
                <Image
                    src={require("../static/img/shoes.jpg")}
                    width="50px"
                    fluid
                />
                <Nav className="ml-auto">
                    <NavLink className="mx-3" exact to="/">
                        Home
                    </NavLink>
                    <NavLink className="mx-3" to="/shop">
                        Shop
                    </NavLink>
                    <NavLink className="mx-3" to="/cart">
                        Cart
                    </NavLink>
                    <NavLink className="mx-3" to="/orders">
                        Orders
                    </NavLink>
                    <NavLink className="mx-3" to="/selling">
                        Selling
                    </NavLink>
                    <NavLink className="mx-3" to="/signup">
                        Sign Up
                    </NavLink>
                    {logInLogOut}
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
