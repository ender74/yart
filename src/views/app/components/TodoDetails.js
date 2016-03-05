import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './TodoTextInput'
import DateTimeInput from './DateTimeInput'
import ButtonBar from './ButtonBar'
import Button from './Button'

import TodoStore from '../../../todoStore'
import TodoActions from '../../../todoActions'

class TodoDetails extends Component {
    constructor(props) {
        super(props)
        this._onUpdateText = this._onUpdateText.bind(this)
        this._onUpdateDue = this._onUpdateDue.bind(this)
        this._onUpdateURL = this._onUpdateURL.bind(this)
        this._onUpdateLocation = this._onUpdateLocation.bind(this)
        this._onClose = this._onClose.bind(this)
    }
        
    render() {
        const editAreaStyle = this.props.id ? 'editTodoArea' : 'hidden'
        return <aside style={ styles[editAreaStyle] }>
                    <TodoTextInput
                        style={ styles.editText }
                        mandatory = 'true'
                        defaultValue={ this.props.text } 
                        onSave={ this._onUpdateText } />
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ this.props.url } 
                        placeholder='http://www.log84.de'
                        onSave={ this._onUpdateURL } />
                    <DateTimeInput
                        style={ styles.editText }
                        defaultValue={ this.props.due } 
                        onSave={ this._onUpdateDue } />
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ this.props.location } 
                        onSave={ this._onUpdateLocation } />
                    <ButtonBar style= { styles.buttonBar }>
                        <Button className='editButton' onClick={ this._onClose } text='X' />
                    </ButtonBar>
                </aside>
    }
    
    _onUpdateText(text) {
        TodoActions.update(this.props.id, { text: text } )
    }

    _onUpdateDue(text) {
        TodoActions.update(this.props.id, { due: text } )
    }

    _onUpdateURL(text) {
        TodoActions.update(this.props.id, { url: text } )
    }

    _onUpdateLocation(text) {
        TodoActions.update(this.props.id, { location: text } )
    }

    _onClose() {
        TodoActions.deactivate()
    }
}

var styles = {
    editTodoArea: {
        '-webkit-flex': '1 6 40%',
        'flex': '1 6 40%',
        '-webkit-order': '2',
        'order': '2',
        'background': 'rgba(255,255,255,0.3)',
        'display': '-webkit-flex',
        '-webkit-flex-direction': 'column',
        'display': 'flex',
        'flex-direction': 'column'
    },
    
    editText: {
        'background': 'rgba(255,255,255,0.7)',
        'border': 'none',
        'border-radius': '10px',
        'padding': '10px 10px 10px 10px',
        'margin': '10px 10px 10px 10px'
    },

    hidden: {
        'display': 'none'
    },
    
    buttonBar: {
        'float': 'right'
    }
}

export default Radium(TodoDetails)