import React, { Component } from 'react';

class Tutorial extends Component {

    render() {
        return (

            <div className="Tutorial">

                <h1>Learn the Rules</h1>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/s2rE_voavMo?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />

                <h2>1. Any live cell with fewer than two live neighbors dies, as if by under population.</h2>
                <h2>2. Any live cell with two or three live neighbors lives on to the next generation.</h2>
                <h2>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</h2>
                <h2>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</h2>

            </div>

        )
    }

}

export default Tutorial;