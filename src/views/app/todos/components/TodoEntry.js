import React, { Component } from 'react'

import { Input } from 'react-bootstrap'

const CheckedInput = (props) => {
    return <Input {...props} checked />
}

const TodoEntry = ( { todo, children, onToggleCompleteClick } ) => {
    const MyClass = todo.complete ? CheckedInput : Input
    return (
        <div style={ style.base }>
            <div style={ style.todo }>
                <MyClass type="checkbox" label={ todo.text } onClick={ onToggleCompleteClick }>
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