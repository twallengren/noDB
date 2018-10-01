/*

Usage
<App />

This is the main app component. It contains all other components that pertain to the main functionality of the app.

*/

import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Link } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div className="RoutesWrapper">

        <nav className='nav'>
          <div className='link-wrap'>

            <Link to="/about">
              <div className='links'>WTF IS THIS?</div>
            </Link>

            <Link to="/tutorial">
              <div className='links'>LEARN</div>
            </Link>

            <Link to="/">
              <div className='links'>GAME OF LIFE SANDBOX</div>
            </Link>

          </div>
        </nav>

        <Routes />

      </div>
    );
  }
}

export default App;
