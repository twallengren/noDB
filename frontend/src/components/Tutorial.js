import React, { Component } from 'react';

class Tutorial extends Component {

    render() {
        return (

            <div className="About">

                <h1>WTF IS THIS?</h1>

                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif" alt="Gosper Glider Gun" />

                <p className="aboutText">The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>

                <p className="aboutText">The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.</p>

                <p className="aboutText">The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>

                <ol>
                    <li>Any live cell with fewer than two live neighbors dies, as if by under population.</li>
                    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                </ol>

                <p className="aboutText">The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.</p>

                <p className="aboutText">Life is undecidable, which means that given an initial pattern and a later pattern, no such algorithm exists that can tell whether the later pattern is ever going to appear. This is a corollary of the halting problem: the problem of determining whether a given program will finish running or continue to run forever from an initial input.</p>

                <p className="aboutText">Indeed, since Life includes a pattern that is equivalent to a Universal Turing Machine (UTM), this deciding algorithm, if it existed, could be used to solve the halting problem by taking the initial pattern as the one corresponding to a UTM plus an input, and the later pattern as the one corresponding to a halting state of the UTM. It also follows that some patterns exist that remain chaotic forever. If this were not the case, one could progress the game sequentially until a non-chaotic pattern emerged, then compute whether a later pattern was going to appear.</p>

                <p className="aboutText">For a more in-depth look at Conway's Game of Life, see <a href="http://web.stanford.edu/~cdebs/GameOfLife/">http://web.stanford.edu/~cdebs/GameOfLife/</a></p>

            </div>

        )
    }

}

export default Tutorial;