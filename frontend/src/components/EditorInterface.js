/*

Usage
<EditorInterface
    pattern={Array} // Tiling saved on state from Scratch Board - used to add new entries to pattern list in UI
    setCursorClick={this.setCursorClick} // Function passed from App.js to pass to Pattern.js so Pattern.js can modify state of App.js
/>

This is the main app component. It contains all other components that pertain to the main functionality of the app.

*/

import React, { Component } from 'react';
import axios from 'axios';
import Pattern from './Pattern'
import RegularButton from './RegularButton';

const BASE_URL = "http://localhost:3005";

class EditorInterface extends Component {

    constructor(props) {

        super(props);

        this.state = {
            patterns: [], // a list of pattern objects (with name, tiling, and id)
            newName: '' // name entered in text box - next tiling saved from Scratch board will take this name
        }

    }

    // Get pattern data sitting on server on mount (so a fresh server starts with 4 default patterns)
    componentDidMount = () => {

        axios.get(`${BASE_URL}/api/patterns`).then(response => {
            this.setState({ patterns: response.data })
        })
    }

    // Function called by button that adds new pattern saved to state from the Scratch board - adds pattern to server
    addPattern = () => {

        // Check if the pattern saved on state is empty
        if (this.props.pattern.length === 0) {

            return // if so, do 

        } else { // if pattern on state is non-empty

            // add pattern to server
            axios.post(`${BASE_URL}/api/patterns`, { name: this.state.newName, tiling: this.props.pattern }).then(response => {
                this.setState({ patterns: response.data })
            })
        }
    }

    // Not yet implemented
    handleNewName = event => {
        this.setState({ newName: event.target.value })
    }

    // Function called by button that deletes pattern from list on UI (by deleting it on the server)
    deletePattern = patternid => {

        axios.delete(`${BASE_URL}/api/patterns/${patternid}`).then(response => {
            this.setState({ patterns: response.data })
        })
    }

    render() {

        // Define patterns to display
        const patterns = this.state.patterns.map(pattern => {
            return (

                // Put each pattern from server in a Pattern component
                <Pattern
                    name={pattern.name}
                    tiling={pattern.tiling}
                    id={pattern.id}
                    key={pattern.id}
                    delFunc={this.deletePattern}
                    setCursorClick={this.props.setCursorClick}
                />

            );
        });

        return (

            <div className="AllPatterns">

                {/* Text input box that defines the name of the new pattern added from the scratch board */}
                <input placeholder='Name of New Pattern' onChange={this.handleNewName} style={{ 'width': '100%' }} />

                {/* Button to add pattern from scratch board to server/list in UI  */}
                <RegularButton
                    clickFunc={this.addPattern}
                    buttonText={'Add Pattern from Scratch Board (must be saved to state)'}
                />

                {/* Show list of patterns currently on server */}
                {patterns}

            </div>

        );

    }
}

export default EditorInterface;
