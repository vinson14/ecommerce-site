import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
