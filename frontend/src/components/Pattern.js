import React, { Component } from 'react';
import RegularButton from './RegularButton';

// This component renders one of the lines on the pattern selection menu
// Has picture of pattern, name on button, and delete button
class Pattern extends Component {

    componentDidMount = () => {

        // Find canvas element and assign context to variable
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");

        // Scale context
        this.ctx.scale(8, 8);

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

                <div style={{
                    'height': '100%',
                    'width': 'auto',
                    'display': 'flex'
                }}>
                    {/* Canvas element with pattern in it */}
                    <canvas
                        ref="canvas"
                        width={8 * this.props.tiling[0].length}
                        height={8 * this.props.tiling.length}
                        className="buttonCanvas" />
                </div>

                <div style={{
                    'display': 'flex',
                    'width': '33%'
                }}>
                    {/* Button to set pattern as pointer on main canvas */}
                    <RegularButton
                        clickFunc={() => { this.props.setCursorClick(this.props.tiling) }}
                        buttonText={`Set ${this.props.name} as cursor on main.`}
                    />
                </div>

                <div style={{
                    'display': 'flex',
                    'width': '33%'
                }}>
                    {/* Button to delete pattern from menu (and remove from server) */}
                    <RegularButton
                        clickFunc={() => { this.props.delFunc(this.props.id) }}
                        buttonText={'DELETE'}
                    />

                    <RegularButton
                        clickFunc={() => { this.props.updateFunc(this.props.id) }}
                        buttonText={'UPDATE NAME'}
                    />
                </div>

            </div>
        );
    }
}

export default Pattern