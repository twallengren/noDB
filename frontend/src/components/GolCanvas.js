/*

Usage
<GolCanvas
    status={int 0 or int 1} // PAUSED and RUNNING, respectively
    numwide={int > 0} // Number of columns (how many cells wide canvas should be)
    numhigh={int > 0} // Number of rows (how many cell tall canvas should be)
    scl={int > 0} // How many pixels make one side of a square cell 
    getPattern={this.props.getPattern} // Passed down from App.js so it can access lifeMatrix
/>

This component contains the canvas for the game of life. Handles animation and direct interaction with canvas.

*/

import React, { Component } from 'react';
import RegularButton from './RegularButton';

class GolCanvas extends Component {

    constructor(props) {

        super(props);

        // lifeMatrix will be used to determine which cells should be filled in at any time
        // lastTime represents last time canvas updated - used for controlling animation speed
        this.state = {
            lifeMatrix: Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0)),
            lastTime: 0,
        }

    }

    componentDidMount = () => {

        // Find canvas element from render method and assign context to variable
        const canvas = this.refs.golcanvas;
        this.ctx = canvas.getContext("2d");

        // Scale context
        this.ctx.scale(this.props.scl, this.props.scl);

        // Fill the canvas dark by default
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    // Function that will fill in a point on the canvas with a given color
    setPoint = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    // Function to handle clicks on the canvas (should fill in the canvas with cursor cdpattern where clicked)
    // will turn off a cell if it is currently on (on --> off does not use the cursor pattern)
    canvasClickHandler = event => {

        // Get x & y coordinates of click
        const clickX = Math.floor(event.nativeEvent.offsetX / this.props.scl);
        const clickY = Math.floor(event.nativeEvent.offsetY / this.props.scl);

        // Create copy of lifeMatrix
        const life = Array.from(this.state.lifeMatrix);

        // Get cursor pattern
        let pattern = this.props.cursorPattern;

        // Transpose pattern (appears upside-down in UI without this)
        pattern = (pattern[0].map((col, i) => pattern.map(row => row[i])));

        // Get dimensions of pattern
        const dimensions = [pattern.length, pattern[0].length];

        // Find center of pattern (should be exact center if odd, just before center if even)
        const centerRow = Math.floor(dimensions[0] / 2);
        const centerColumn = Math.floor(dimensions[1] / 2);

        // Check if point is marked (live) in state
        if (this.state.lifeMatrix[clickX][clickY] === 1) {

            // If so, fill it in black and reset state
            this.setPoint(clickX, clickY, "#303030");
            life[clickX][clickY] = 0;
            this.setState({ lifeMatrix: life });

        } else {

            // If clicked point is dead in current iteration, fill it in white(ish) with cursorPattern
            for (let row = 0; row < dimensions[0]; row++) {
                for (let column = 0; column < dimensions[1]; column++) {

                    if (pattern[row][column] === 1) {

                        this.setPoint(clickX - centerRow + row, clickY - centerColumn + column, "#F0F0DF")
                        life[clickX - centerRow + row][clickY - centerColumn + column] = 1;

                    }
                }
            }

            this.setState({ lifeMatrix: life })

        }

    }

    // Function to transform current lifeMatrix on state into lifeMatrix of next generation
    drawCanvas = () => {

        // Initialize empty array to be the lifeMatrix on the next generation
        const newLife = Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0));

        // Iterate through each element and update life state
        for (let i = 0; i < this.props.numwide; i++) {
            for (let j = 0; j < this.props.numhigh; j++) {

                let liveCount = 0;

                // Count live neighbors of current cell
                for (let c1 = -1; c1 < 2; c1++) {
                    for (let c2 = -1; c2 < 2; c2++) {

                        // Use of modulus here handles some periodic boundary conditions
                        let x = (i + c1) % this.props.numwide;
                        let y = (j + c2) % this.props.numhigh;

                        // Handle remaining horizontal periodic boundary conditions
                        // Something that disappears on the left should reappear on the right
                        if (x === -1) {
                            x = this.props.numwide - 1;
                        }

                        // Handle remaining vertical periodic boundary conditions
                        // Something that disappears at the bottom should reappear at the top
                        if (y === -1) {
                            y = this.props.numhigh - 1;
                        }

                        // Skip center cell (we are counting only its neighbors)
                        if (x === i & y === j) {
                            continue
                        }

                        // Add one to count if neighbor cell is alive
                        if (this.state.lifeMatrix[x][y] === 1) {
                            liveCount += 1;
                        }

                    }
                }

                // Decide fate (1 -> live on next generation, 0 -> dead on next generation)
                const newFate = this.liveOrDie(this.state.lifeMatrix[i][j], liveCount);
                newLife[i][j] = newFate;

                // If fate is death
                if (newLife[i][j] === 0) {

                    // Fill it in black
                    this.setPoint(i, j, "#303030");

                } else {

                    // If not, fill it in white(ish)
                    this.setPoint(i, j, "#F0F0DF")

                }

            }
        }

        // Reset state (iterate to the next generation)
        this.setState({ lifeMatrix: newLife })

    }

    liveOrDie = (st, liveCount) => {

        // If cell is live in current generation
        if (st === 1) {

            // Stay live on next generation if there are 2 or 3 live neighbors
            if ((liveCount === 2) | (liveCount === 3)) {
                return 1


            } else { // Otherwise die on next generation
                return 0
            }


        } else { // If cell is dead in current generation

            // Come back to life on next generation if there are 3 live neighbors
            if (liveCount === 3) {
                return 1

                // Otherwise stay dead on next generation
            } else {
                return 0
            }
        }

    }

    update = (time = 0) => {

        // Check status prop
        const stat = this.props.status;

        // If simulation status is 'PAUSED'
        if (stat === 0) {
            return
        } else { // If simulation status is 'RUNNING'

            // Calculate time since last update (diff)
            const diff = time - this.state.lastTime;

            // If diff is bigger than 100 (0.1 second), update lifeMatrix & lastTime
            if (diff >= 100) {

                this.drawCanvas();
                this.setState({ lastTime: time })

            }

            // Not sure exactly what this is doing, but is required for animation
            requestAnimationFrame(this.update)

        }

    }

    // Resets lifeMatrix on state to an array of zeros for next generation
    handleClearClick = () => {
        this.setState({ lifeMatrix: Array(this.props.numwide).fill().map(() => Array(this.props.numhigh).fill(0)) })
    }

    render() {
        return (
            <div className='GolCanvas'>

                {/* Actual canvas displayed in the UI */}
                <canvas
                    ref="golcanvas"
                    width={this.props.scl * this.props.numwide}
                    height={this.props.scl * this.props.numhigh}
                    onClick={this.canvasClickHandler}
                    style={{ 'border-radius': '2%' }}
                />

                {/* Call update function - starts animation when simulation status is 'RUNNING' (this.props.status === 1) */}
                {this.update()}

                <div style={{ 'width': '100%' }}>

                    {/* Button to save pattern to state on App component */}
                    <RegularButton
                        clickFunc={() => { this.props.getPattern(this.state.lifeMatrix) }}
                        buttonText={'Save Pattern to State'}
                    />

                    {/* Button to clear the canvas on next generation */}
                    <RegularButton
                        clickFunc={this.handleClearClick}
                        buttonText={'Clear Canvas (Simulation Must Be Running)'}
                    />

                </div>


            </div >
        )
    }
}

export default GolCanvas