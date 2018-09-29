import React, { Component } from "react";
import { Route } from "react-router-dom";

import Home from "./components/Main";
import About from "./components/About";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
            </div>
        )
    }
}

export default Routes;