import React, { PropTypes, Component } from 'react'
import { ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

import TodoEntry from './TodoEntry'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo =>
        entries.push(
            <ListGroupItem key={ todo.id }>
                <TodoEntry todo={ todo } active={ active && active.id == todo.id }
                    onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                </TodoEntry>
                <ButtonGroup>
                    <Button hidden = { !todo.url } onClick={ () => onOpenURL(todo) } tooltip='Link öffnen'><Glyphicon glyph='link' /></Button>
                    <Button onClick={ () => onToggleTodoActiveClick( todo ) } tooltip='Eintrag bearbeiten'><Glyphicon glyph='wrench' /></Button>
                    <Button onClick={ () => onDestroyClick(todo) } tooltip='Eintrag löschen'><Glyphicon glyph='trash' /></Button>
                </ButtonGroup>
            </ListGroupItem>
        )
    )

    return (
        <ListGroup>
        { entries }
        </ListGroup>
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