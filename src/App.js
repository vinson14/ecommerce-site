import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Logout from "./pages/Logout";
import Selling from "./pages/Selling";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
    return (
        <div className="h-100">
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/shop">
                            <Shop />
                        </Route>
                        <Route exact path="/cart">
                            <Cart />
                        </Route>
                        <Route exact path="/orders">
                            <Orders />
                        </Route>
                        <Route exact path="/selling">
                            <Selling />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/logout">
                            <Logout />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
