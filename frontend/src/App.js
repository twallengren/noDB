import React, { Component } from 'react';
import './App.css';
import GameOfLife from './components/GameOfLife'
import EditorInterface from './components/EditorInterface'

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="MainBoardDiv">
          <GameOfLife numwide={80} numhigh={80} scl={10} title={"Conway's Game of Life Main Board"} />
        </div>

        <div className="ScratchBoardDiv">
          <GameOfLife numwide={21} numhigh={10} scl={20} title={"Scratch Board"} />
          <EditorInterface />
        </div>

      </div>
    );
  }
}

export default App;
