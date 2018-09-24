import React, { Component } from 'react';

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

    setPoint = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    render() {
        return (
            <div key={this.props.id} className='PatternDisplay'>

                <canvas
                    ref="canvas"
                    width={20 * this.props.tiling[0].length}
                    height={20 * this.props.tiling.length}
                    className="buttonCanvas" />
                <button className='PatternButton'>{this.props.name}</button>
                <button onClick={() => { this.props.delFunc(this.props.id) }} style={{ 'cursor': 'pointer' }}>DELETE</button>

            </div>
        );
    }
}

export default Pattern