import React, { Component } from 'react'

import { Checkbox } from 'react-bootstrap'

const CheckedInput = (props) => {
    return <Checkbox {...props} checked />
}

const TodoEntry = ( { todo, children, onToggleCompleteClick } ) => {
    const MyClass = todo.complete ? CheckedInput : Checkbox
    return (
        <div style={ style.base }>
            <div style={ style.todo }>
                <MyClass onClick={ onToggleCompleteClick } readOnly>
                    { todo.text }
                </MyClass>
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