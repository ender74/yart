import React, { PropTypes, Component } from 'react'
import { ButtonToolbar, Button, ButtonGroup, Glyphicon } from 'react-bootstrap'

import TodoEntry from './TodoEntry'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo => {
            var btnOpenUrl
            if (todo.url)
                btnOpenUrl = <Button onClick={ () => onOpenURL(todo) }><Glyphicon glyph='link' /></Button>

            entries.push(
                <TodoEntry key={ todo.id } todo={ todo } active={ active && active.id == todo.id }
                    onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                    <ButtonGroup>
                        {btnOpenUrl}
                        <Button onClick={ () => onToggleTodoActiveClick( todo ) }><Glyphicon glyph='wrench' /></Button>
                        <Button onClick={ () => onDestroyClick(todo) }><Glyphicon glyph='trash' /></Button>
                    </ButtonGroup>
                </TodoEntry>
            )
        }
    )
    return (
        <div>
        { entries }
        </div>
    )
}

TodoList.propTypes={
    todos: PropTypes.array.isRequired,
    active: PropTypes.object,
    onToggleTodoActiveClick: PropTypes.func, 
    onDestroyClick: PropTypes.func, 
    onOpenURL: PropTypes.func
}

export default TodoList