import React, { Component } from 'react';
import axios from 'axios';
import Pattern from './Pattern'

const BASE_URL = "http://localhost:3005";

class EditorInterface extends Component {

    constructor(props) {

        super(props);

        this.state = {
            patterns: [],
            newName: ''
        }

    }

    componentDidMount = () => {
        axios.get(`${BASE_URL}/api/patterns`).then(response => {
            this.setState({ patterns: response.data })
        })
    }

    addPattern = () => {

        // assume pattern is passed in as a prop
        if (this.props.pattern.length === 0) {
            return
        } else {
            let pattern = this.props.pattern;
            axios.post(`${BASE_URL}/api/patterns`, { name: this.state.newName, tiling: pattern }).then(response => {
                this.setState({ patterns: response.data })
            })
        }
    }

    handleNewName = event => {
        this.setState({ newName: event.target.value })
    }

    deletePattern = patternid => {
        axios.delete(`${BASE_URL}/api/patterns/${patternid}`).then(response => {
            this.setState({ patterns: response.data })
        })
    }

    render() {

        // Define patterns to display
        const patterns = this.state.patterns.map(pattern => {
            return (

                <Pattern name={pattern.name} tiling={pattern.tiling} id={pattern.id} key={pattern.id} delFunc={this.deletePattern} />

            );
        });

        return (

            <div className="AllPatterns">
                <input placeholder='Name of New Pattern' onChange={this.handleNewName} />
                <button style={{ 'width': '100%' }} onClick={this.addPattern}>Add Pattern from Scratch Board</button>
                {patterns}
            </div>

        );

    }
}

export default EditorInterface;
