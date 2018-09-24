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

                <h4>
                    {this.props.title}
                </h4>

                <GolCanvas
                    status={this.state.status}
                    numwide={this.props.numwide}
                    numhigh={this.props.numhigh}
                    scl={this.props.scl}
                    getPattern={this.props.getPattern} />

                <button className="confirmationButton" onClick={this.handleSimClick} style={{ 'width': '100%' }}>

                    Start/Stop Simulation

                </button>

                <div style={{ 'width': '100%' }}>

                    Simulation Status: {this.statusTranslate()}

                </div>

            </div>
        )
    }
}

export default GameOfLife