import React, { Component } from 'react'
import Radium from 'radium'

import Button from './Button'
import ButtonBar from './ButtonBar'
import Label from './Label'
import TodoActions from '../../../todoActions'

class TodoEntry extends Component {
    constructor(props) {
        super(props)
        this._onDestroyClick=this._onDestroyClick.bind(this)
        this._onToggleActiveClick=this._onToggleActiveClick.bind(this)
    }
    render() {
        const todo = this.props.todo
        const styleName = this.props.active ? 'active' : 'default'
        return <Label style={ [styles.base, styles[styleName]] } key={ todo.id } text={ todo.text }>
               <ButtonBar style= { styles.buttonBar }> 
                    <Button onClick={ this._onToggleActiveClick } tooltip='Eintrag bearbeiten' image="icons/black-wrench.svg" />
                    <Button onClick={ this._onDestroyClick } tooltip='Eintrag löschen' image="icons/delete-button.svg" />
               </ButtonBar> 
        </Label>
    }
    
    _onToggleActiveClick() { 
        if (this.props.active)
            TodoActions.deactivate()
        else
            TodoActions.activate(this.props.todo.id) 
    }

    _onDestroyClick() { 
        TodoActions.destroy(this.props.todo.id) 
    }
}

var styles = {
       base: {
            'display': 'table',
            'padding': '0.5em 0.5em 0.5em 0.5em',
            'margin': '0.5em 0em 0em 0em',
            'width': '100%',
            'border-radius': '10px',
            'color': '#000000'
        },
        default: {
            'background': 'rgba(255, 255, 255, 0.7)',
            'font-weight': 'normal'
        },
        active: {
            'background': 'rgba(255, 255, 255, 0.7)',
            'font-weight': 'bold'
        }, 
        buttonBar: {
            'float': 'right'
        }
}

export default Radium(TodoEntry)