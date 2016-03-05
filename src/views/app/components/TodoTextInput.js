import React, { Component } from 'react'
import Radium from 'radium'

import Input from './Input'

const ENTER_KEY_CODE = 13

class TodoTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this._save=this._save.bind(this)
        this._onChange=this._onChange.bind(this)
        this._onKeyDown=this._onKeyDown.bind(this)
        this._onBlur=this._onBlur.bind(this)
    }
    
    render() {
        const value = this.state.valueSet ? this.state.value : this.props.defaultValue
        return <Input 
            className={ this.props.className }
            style={ this.props.style }
            id = { this.props.id }
            placeholder = { this.props.placeholder }
            onBlur = { this._onBlur }
            onChange = { this._onChange }
            onKeyDown = { this._onKeyDown }
            value = { value }
            autoFocus = { true} />
    }
    
    _save() {
        if (this.state.valueSet && (this.state.value || !this.props.mandatory))
            this.props.onSave( this.state.value )
        this.setState({ valueSet: false })
    } 
   
    _onBlur() {
        this._save()
    } 

    _onChange(event) {
        this.setState({ value: event.target.value, valueSet: true })
    } 

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save()
        }
    }
}

export default Radium(TodoTextInput)