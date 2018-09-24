/*

Usage in App.js 
<GameOfLife numwide={int} numhigh={int} scl={int=20} title={"Component Header"} />

*/

import React, { Component } from 'react';
import GolCanvas from './GolCanvas';

class GameOfLife extends Component {

    constructor(props) {

        super(props);

        this.state = {
            status: 0
        }

    }

    handleSimClick = event => {

        const newstat = (this.state.status + 1) % 2;
        this.setState({ status: newstat });

    }

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

                <h4 style={{ 'color': "#F0F0DF" }}>
                    {this.props.title}
                </h4>

                <div style={{ 'width': '100%', 'color': "#F0F0DF" }}>

                    Simulation Status: {this.statusTranslate()}

                </div>

                <GolCanvas
                    status={this.state.status}
                    numwide={this.props.numwide}
                    numhigh={this.props.numhigh}
                    scl={this.props.scl}
                    getPattern={this.props.getPattern} />

                <button className="RegularButton" onClick={this.handleSimClick} style={{ 'width': '100%', 'cursor': 'pointer' }}>

                    Start/Stop Simulation

                </button>

            </div>
        )
    }
}

export default GameOfLife