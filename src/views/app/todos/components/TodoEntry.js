import React, { Component } from 'react'

import { Checkbox } from 'react-bootstrap'

const TodoEntry = ( { todo, children, active, onToggleCompleteClick } ) => {
    return (
        <div style={ style.base }>
            <div style={ style.todo }>
                <Checkbox bsStyle='success' onClick={ onToggleCompleteClick } readOnly checked={ todo.complete }>
                    { todo.text }
                </Checkbox>
            </div>
            <div style={ style.children }>
                { children }
            </div>
        </div>
    )
}

const style = {
    base: {
        display: 'flex'
    },

    todo: {
        width: '55%'
    },

    children: {
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
}

export default TodoEntry