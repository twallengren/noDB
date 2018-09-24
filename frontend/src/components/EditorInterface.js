import React, { Component } from 'react';
import axios from 'axios';
import Pattern from './Pattern'

const BASE_URL = "http://localhost:3005";

class EditorInterface extends Component {

    constructor(props) {

        super(props);

        this.state = {
            patterns: []
        }

    }

    componentDidMount = () => {
        axios.get(`${BASE_URL}/api/patterns`).then(response => {
            this.setState({ patterns: response.data })
        })
    }

    render() {

        // Define patterns to display
        const patterns = this.state.patterns.map(pattern => {
            return (

                <Pattern name={pattern.name} tiling={pattern.tiling} id={pattern.id} key={pattern.id} />

            );
        });

        return (

            <div style={{ 'width': '100%' }}>
                <button>Add Pattern</button>
                {patterns}
            </div>

        );

    }
}

export default EditorInterface;
