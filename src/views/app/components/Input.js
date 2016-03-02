import React, { Component } from 'react'
import Radium from 'radium'

class Input extends Component {
    render() {
        return <input 
            style={ this.props.style }
            className={ this.props.className }
            id = { this.props.id }
            placeholder = { this.props.placeholder }
            onBlur = { this.props.onBlur }
            onChange = { this.props.onChange }
            onKeyDown = { this.props.onKeyDown }
            value = { this.props.value }
            autoFocus = { this.props.autofocus } />
    }
}

export default Radium(Input)