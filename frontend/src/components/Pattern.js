import React, { Component } from 'react';

// This component renders one of the lines on the pattern selection menu
// Has picture of pattern, name on button, and delete button
class Pattern extends Component {

    componentDidMount = () => {

        // Find canvas element and assign context to variable
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");

        // Scale context
        this.ctx.scale(20, 20);

        // Fill the canvas black
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        let i = 0;
        let j = 0;

        // Iterate through the tiling and fill in points
        this.props.tiling.forEach(row => {
            row.forEach(entry => {
                if (entry === 1) {
                    this.setPoint(j, i, "#F0F0DF")
                }
                j++;
            })
            i++;
            j = 0;
        })

    }

    // Function that will fill in a point on the canvas with a given color
    setPoint = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    render() {
        return (
            <div key={this.props.id} className='PatternDisplay'>

                {/* Canvas element with pattern in it */}
                <canvas
                    ref="canvas"
                    width={20 * this.props.tiling[0].length}
                    height={20 * this.props.tiling.length}
                    className="buttonCanvas" />

                {/* Button to set pattern as pointer on main canvas */}
                <button className='PatternButton' onClick={() => { this.props.setCursorClick(this.props.tiling) }}>
                    Set {this.props.name} as cursor on main.
                </button>

                {/* Button to delete pattern from menu (and remove from server) */}
                <button onClick={() => { this.props.delFunc(this.props.id) }} style={{ 'cursor': 'pointer' }}>DELETE</button>

            </div>
        );
    }
}

export default Pattern