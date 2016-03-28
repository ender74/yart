import React, { Component } from 'react'

import Label from '../../components/Label'

const TodoEntry = ( { todo, active, children, onToggleCompleteClick } ) => {
    return <Label onCheck={ onToggleCompleteClick }
        checked={ todo.complete } key={ todo.id } text={ todo.text }>
        { children }
    </Label>
}

export default TodoEntry