import React, { Component } from 'react';
import './App.css';
import GameOfLife from './components/GameOfLife'
import EditorInterface from './components/EditorInterface'

class App extends Component {

  constructor() {

    super();

    // Used as default pattern on main/only pattern on scratch
    let singleton = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];

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

    let pattern = this.patternFromBoard(board);

    if (pattern === 'invalid') {
      return
    }

    this.setState({ mainPattern: pattern })

  }

  // Function to strip board of empty cells and return the minimum rectangle required for filled cells
  patternFromBoard = board => {

    let i = 0;
    let j = 0;

    let rowCoords = [];
    let columnCoords = [];

    board.forEach(row => {

      row.forEach(entry => {

        if (entry === 1) {

          rowCoords.push(j)
          columnCoords.push(i)

        }

        j++;

      })

      i++;
      j = 0;

    })

    let numofrows = Math.max(...rowCoords) - Math.min(...rowCoords) + 1;
    let numofcolumns = Math.max(...columnCoords) - Math.min(...columnCoords) + 1;

    if (numofrows === -Infinity | numofcolumns === -Infinity) {
      return 'invalid'
    }

    let pattern = Array(numofrows).fill().map(() => Array(numofcolumns).fill(0));

    for (let num = 0; num < rowCoords.length; num++) {
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

export default App;
