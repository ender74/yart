import React, { Component } from 'react'
import Radium from 'radium'

class Input extends Component {
    render() {
        return <input {...this.props} />
    }
}

export default Radium(Input)