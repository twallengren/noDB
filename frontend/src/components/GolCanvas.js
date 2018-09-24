import React, { Component } from 'react';

class GolCanvas extends Component {

    constructor(props) {

        super(props);

        this.state = {
            lifeMatrix: Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0)),
            lastTime: 0
        }

    }

    componentDidMount = () => {

        // Find canvas element and assign context to variable
        const canvas = this.refs.golcanvas;
        this.ctx = canvas.getContext("2d");

        // Scale context
        this.ctx.scale(this.props.scl, this.props.scl);

        // Fill the canvas black
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    setPoint = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    canvasClickHandler = event => {

        // Get x & y coordinates of click
        const clickX = Math.floor(event.nativeEvent.offsetX / this.props.scl);
        const clickY = Math.floor(event.nativeEvent.offsetY / this.props.scl);

        // Create copy of lifeMatrix
        const life = Array.from(this.state.lifeMatrix);

        // Check if point is marked in state
        if (this.state.lifeMatrix[clickX][clickY] === 1) {

            // If so, fill it in black and reset state
            this.setPoint(clickX, clickY, "#303030");
            life[clickX][clickY] = 0;
            this.setState({ lifeMatrix: life });

        } else {

            // If not, fill it in white(ish)
            this.setPoint(clickX, clickY, "#F0F0DF")
            life[clickX][clickY] = 1;
            this.setState({ lifeMatrix: life })

        }

    }

    drawCanvas = () => {

        // Get copy of current life state
        const newLife = Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0));

        // Iterate through each element and update life state
        for (let i = 0; i < this.props.numwide; i++) {
            for (let j = 0; j < this.props.numhigh; j++) {

                let liveCount = 0;

                // Count live neighbors of current cell
                for (let c1 = -1; c1 < 2; c1++) {
                    for (let c2 = -1; c2 < 2; c2++) {

                        let x = (i + c1) % this.props.numwide;
                        let y = (j + c2) % this.props.numhigh;

                        if (x === -1) {
                            x = this.props.numwide - 1;
                        }

                        if (y === -1) {
                            y = this.props.numhigh - 1;
                        }

                        if (this.state.lifeMatrix[x][y] === 1) {
                            if (x === i & y === j) {
                                // Don't count center cell
                                continue
                            }
                            liveCount += 1;
                        }

                    }
                }

                // Decide fate
                const newFate = this.liveOrDie(this.state.lifeMatrix[i][j], liveCount);
                newLife[i][j] = newFate;

            }
        }

        // Iterate through each element and update life state
        for (let i = 0; i < this.props.numwide; i++) {
            for (let j = 0; j < this.props.numhigh; j++) {

                // If fate is death
                if (newLife[i][j] === 0) {

                    // Fill it in black and reset state
                    this.setPoint(i, j, "#303030");

                } else {

                    // If not, fill it in white(ish)
                    this.setPoint(i, j, "#F0F0DF")

                }

            }

        }

        this.setState({ lifeMatrix: newLife })

    }

    liveOrDie = (st, liveCount) => {

        if (st === 1) {
            if ((liveCount === 2) | (liveCount === 3)) {
                return 1
            } else {
                return 0
            }
        } else {
            if (liveCount === 3) {
                return 1
            } else {

                return 0
            }
        }

    }

    update = (time = 0) => {

        // Check status prop
        const stat = this.props.status;

        if (stat === 0) {
            return
        } else {

            // Calculate time difference
            const del = time - this.state.lastTime;

            // If del is bigger than 100 (0.1 second), update canvas
            if (del >= 100) {

                this.drawCanvas();
                this.setState({ lastTime: time })

            }

            requestAnimationFrame(this.update)

        }

    }

    handleClearClick = () => {
        this.setState({ lifeMatrix: Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0)) })
    }

    render() {
        return (
            <div className='GolCanvas'>

                <canvas
                    ref="golcanvas"
                    width={this.props.scl * this.props.numwide}
                    height={this.props.scl * this.props.numhigh}
                    onClick={this.canvasClickHandler}
                    style={{ 'cursor': 'pointer' }} />
                {this.update()}

                <div style={{ 'width': '100%' }}>

                    <button className="RegularButton" style={{ 'width': '100%', 'cursor': 'pointer' }} onClick={() => {
                        this.props.getPattern(this.state.lifeMatrix)
                    }}>Save Pattern to State</button>

                    <button className="RegularButton" onClick={this.handleClearClick} style={{ 'width': '100%', 'cursor': 'pointer' }} >

                        Clear Canvas (Simulation must be Running)

                    </button>

                </div>


            </div>
        )
    }
}

export default GolCanvas