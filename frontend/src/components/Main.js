/*

Usage
<Main />

This is the main app component. It contains all other components that pertain to the main functionality of the app.

*/

import React, { Component } from 'react';
import GameOfLife from './GameOfLife'
import EditorInterface from './EditorInterface'

class Main extends Component {

    constructor() {

        super();

        this.state = {
            scratchPattern: [],
            mainPattern: [],
            cursorPattern: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
            singleton: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
        }

    }

    // Function to grab lifeMatrix from scratch board
    getScratchPattern = board => {

        // Extract smallest possible pattern (cut off unnecessary cells from board)
        let pattern = this.patternFromBoard(board);

        // Do nothing if no pattern exists
        if (pattern === 'invalid') {
            return
        }

        // Set scratch pattern to state (so it can be saved to server)
        this.setState({ scratchPattern: pattern })

    }

    // Same as getScratchPattern function, but directed toward main board
    getMainPattern = board => {

        // Extract smallest possible pattern (cut off unnecessary cells from board)
        let pattern = this.patternFromBoard(board);

        // Do nothing if no pattern exists
        if (pattern === 'invalid') {
            return
        }

        // Set main pattern to state
        this.setState({ mainPattern: pattern })

    }

    // Function to strip board of empty cells and return the minimum rectangle required for filled cells
    patternFromBoard = board => {

        // Initialize counting variables
        let i = 0;
        let j = 0;

        // Initialize arrays that will represent the coordinates of currently live cells
        let rowCoords = [];
        let columnCoords = [];

        // This loop block fills in the rowCoords and columnCoords arrays
        board.forEach(row => {
            row.forEach(entry => {

                // If current cell is live, add its coordinates to rowCoords & columnCoords
                if (entry === 1) {

                    rowCoords.push(j)
                    columnCoords.push(i)

                }

                j++;

            })

            i++;
            j = 0;

        })

        // Find span of live cells (to help build the smallest rectangle containing the live cells)
        let numofrows = Math.max(...rowCoords) - Math.min(...rowCoords) + 1;
        let numofcolumns = Math.max(...columnCoords) - Math.min(...columnCoords) + 1;

        // Exception for when no live cells are on the board
        if (numofrows === -Infinity | numofcolumns === -Infinity) {
            return 'invalid'
        }

        // Initialize smallest rectangular array that will fit all live cells
        let pattern = Array(numofrows).fill().map(() => Array(numofcolumns).fill(0));

        // Fill in pattern array
        for (let num = 0; num < rowCoords.length; num++) {

            // Using rowCoords[num] - Math.min(...rowCoords) & columnCoords[num] - Math.min(...columnCoords)
            // forces 0-indexing. This means that pattern is invariant with respect to location on canvas.
            pattern[rowCoords[num] - Math.min(...rowCoords)][columnCoords[num] - Math.min(...columnCoords)] = 1;
        }

        return pattern

    }

    // Set cursor pattern as tiling input
    setCursorClick = (tiling) => {
        this.setState({ cursorPattern: tiling })
    }

    render() {
        return (
            <div className="App">

                {/* Div on left side of screen w/ main board */}
                <div className="MainBoardDiv">

                    {/* Main Game of Life board */}
                    <GameOfLife
                        numwide={80}
                        numhigh={80}
                        scl={10}
                        title={"Conway's Game of Life Main Board"}
                        getPattern={this.getMainPattern}
                        cursorPattern={this.state.cursorPattern}
                    />

                </div>

                {/* Div on right side of screen w/ scratch board + pattern list */}
                <div className="ScratchBoardDiv">

                    {/* Scratch Game of Life board */}
                    <GameOfLife
                        numwide={21}
                        numhigh={10}
                        scl={20}
                        title={"Scratch Board"}
                        getPattern={this.getScratchPattern}
                        cursorPattern={this.state.singleton}
                    />

                    {/* Pattern menu (to select cursor on main) */}
                    <EditorInterface
                        pattern={this.state.scratchPattern}
                        setCursorClick={this.setCursorClick}
                    />

                </div>

            </div>
        );
    }
}

export default Main;