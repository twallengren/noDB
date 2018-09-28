/*

Usage
<GameOfLife 
    numwide={int > 0} // Number of columns (how many cells wide canvas should be)
    numhigh={int > 0} // Number of rows (how many cell tall canvas should be)
    scl={int=20} // How many pixels make one side of a square cell 
    title={string} // Title shown above canvas
    />

This component is a wrapper for the component with the actual game of life (GolCanvas.js).
Displays title, and handles/displays simulation status.

*/

import React, { Component } from 'react';
import GolCanvas from './GolCanvas';
import RegularButton from './RegularButton';

class GameOfLife extends Component {

    constructor(props) {

        super(props);

        // status dictates whether the simulation is running or not (1 & 0, respectively)
        this.state = {
            status: 0
        }

    }

    // Changes status on state upon click (0 <--> 1)
    handleSimClick = event => {

        const newstat = (this.state.status + 1) % 2;
        this.setState({ status: newstat });

    }

    // Translate status on state into PAUSED or RUNNING for display in-app
    statusTranslate = () => {

        if (this.state.status === 0) {
            return "PAUSED"
        } else {
            return "RUNNING"
        }

    }

    render() {
        return (
            <div className="GameOfLife">

                <h4 style={{ 'color': "#1b1b1b" }}>
                    {this.props.title}
                </h4>

                <div style={{ 'width': '100%', 'color': "#1b1b1b" }}>

                    Simulation Status: {this.statusTranslate()}

                </div>

                <GolCanvas
                    status={this.state.status}
                    numwide={this.props.numwide}
                    numhigh={this.props.numhigh}
                    scl={this.props.scl}
                    getPattern={this.props.getPattern}
                    cursorPattern={this.props.cursorPattern}
                />

                <RegularButton
                    clickFunc={this.handleSimClick}
                    buttonText={'Start/Stop Simulation'}
                />

            </div >
        )
    }
}

export default GameOfLife