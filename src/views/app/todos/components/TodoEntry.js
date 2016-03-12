import React, { Component } from 'react'
import Radium from 'radium'

import Label from '../../components/Label'

const TodoEntry = ( { todo, active, children, onToggleCompleteClick } ) => {
    return <Label style={ [styles.base, styles[active ? 'active' : 'default']] } onCheck={ onToggleCompleteClick } 
        checked={ todo.complete } key={ todo.id } text={ todo.text }>
        { children }
    </Label>
}

var styles = {
    base: {
        'display': 'table',
        'padding': '0.5em 0.5em 0.5em 0.5em',
        'margin': '0.5em 0em 0em 0em',
        'width': '100%',
        'borderRadius': '10px',
        'color': '#000000'
    },
    default: {
        'background': 'rgba(255, 255, 255, 0.7)',
        'fontWeight': 'normal'
    },
    active: {
        'background': 'rgba(255, 255, 255, 0.7)',
        'fontWeight': 'bold'
    }
}

export default Radium(TodoEntry)
