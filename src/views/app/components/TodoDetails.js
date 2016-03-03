import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './TodoTextInput'
import ButtonBar from './ButtonBar'
import Button from './Button'

import TodoStore from '../../../todoStore'
import TodoActions from '../../../todoActions'

class TodoDetails extends Component {
    constructor(props) {
        super(props)
        this._onUpdateText = this._onUpdateText.bind(this)
        this._onClose = this._onClose.bind(this)
    }
        
    render() {
        const editAreaStyle = this.props.id ? 'editTodoArea' : 'hidden'
        return <aside style={ styles[editAreaStyle] }>
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ this.props.text } 
                        onSave={ this._onUpdateText } />
                    <ButtonBar style= { styles.buttonBar }>
                        <Button className='editButton' onClick={ this._onClose } text='X' />
                    </ButtonBar>
                </aside>
    }
    
    _onUpdateText(text) {
        TodoActions.update(this.props.id, { text: text } )
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
        'background': 'rgba(228,228,228,0.5)',
        'display': '-webkit-flex',
        '-webkit-flex-direction': 'column',
        'display': 'flex',
        'flex-direction': 'column'
    },
    
    editText: {
        'background': 'rgba(128,128,128,0.5)',
        'border': 'none',
        'border-radius': '10px',
        'padding': '0.5em 0.5em 0.5em 0.5em',
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