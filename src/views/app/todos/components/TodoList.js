import React, { PropTypes, Component } from 'react'
import { ButtonToolbar, Button, Nav, NavItem, Glyphicon } from 'react-bootstrap'

import TodoEntry from './TodoEntry'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo => {
            var btnOpenUrl
            if (todo.url)
                btnOpenUrl = <NavItem onClick={ () => onOpenURL(todo) }><Glyphicon glyph='link' /></NavItem>

            entries.push(
                <TodoEntry key={ todo.id } todo={ todo } active={ active && active.id == todo.id }
                    onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                    <Nav bsStyle="pills" pullRight>
                        {btnOpenUrl}
                        <NavItem onClick={ () => onToggleTodoActiveClick( todo ) }><Glyphicon glyph='wrench' /></NavItem>
                        <NavItem onClick={ () => onDestroyClick(todo) }><Glyphicon glyph='trash' /></NavItem>
                    </Nav>
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
    todos: PropTypes.object.isRequired,
    active: PropTypes.object,
    onToggleTodoActiveClick: PropTypes.func, 
    onDestroyClick: PropTypes.func, 
    onOpenURL: PropTypes.func
}

export default TodoList