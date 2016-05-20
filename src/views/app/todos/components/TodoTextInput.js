import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { injectIntl } from 'react-intl'

const ENTER_KEY_CODE = 13

class TodoTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this._save=this._save.bind(this)
        this._onKeyDown=this._onKeyDown.bind(this)
    }
    
    render() {
        const { intl } = this.props

        const placeholder = intl.formatMessage({
            id: 'todo.add_entry',
            defaultMessage: '+ add a new entry here'
        })

        const value = this.state.valueSet ? this.state.value : this.props.defaultValue
        return (
            <FormControl
                type = 'text'
                className= { this.props.className }
                style= { this.props.style }
                id = { this.props.id }
                placeholder = { placeholder }
                onBlur = { this._save }
                onChange = { (event) => this.setState({ value: event.target.value, valueSet: true }) }
                onKeyDown = { this._onKeyDown }
                value = { value }
                autoFocus = { true} />
        )
    }
    
    _save() {
        if (this.state.valueSet && (this.state.value || !this.props.mandatory))
            this.props.onSubmitEditing( this.state.value )
        this.setState({ valueSet: false })
    } 
   
    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save()
        }
    }
}

export default injectIntl(TodoTextInput)