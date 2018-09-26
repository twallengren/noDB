import React, { Component } from 'react';
import './App.css';
import GameOfLife from './components/GameOfLife'
import EditorInterface from './components/EditorInterface'

class App extends Component {

  constructor() {

    super();

    this.state = {
      scratchPattern: [],
      mainPattern: [],
      cursorPattern: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    }

  }

  getScratchPattern = board => {

    let pattern = this.patternFromBoard(board);

    if (pattern === 'invalid') {
      return
    }

    this.setState({ scratchPattern: pattern })

  }

  getMainPattern = board => {

    let pattern = this.patternFromBoard(board);

    if (pattern === 'invalid') {
      return
    }

    this.setState({ mainPattern: pattern })

  }

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

  setCursorClick = (tiling) => {
    this.setState({ cursorPattern: tiling })
  }

  render() {
    return (
      <div className="App">

        <div className="MainBoardDiv">

          <GameOfLife
            numwide={80}
            numhigh={80}
            scl={10}
            title={"Conway's Game of Life Main Board"}
            getPattern={this.getMainPattern}
            cursorPattern={this.state.cursorPattern}
          />

        </div>

        <div className="ScratchBoardDiv">

          <GameOfLife
            numwide={21}
            numhigh={10}
            scl={20}
            title={"Scratch Board"}
            getPattern={this.getScratchPattern}
            cursorPattern={[[0, 0, 0], [0, 1, 0], [0, 0, 0]]}
          />

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
