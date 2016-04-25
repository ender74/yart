import React, { PropTypes, Component } from 'react'
import { ButtonToolbar, Button, ButtonGroup, Glyphicon, ListGroupItem } from 'react-bootstrap'

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
                <ListGroupItem key={ todo.id } active={ active && active.id == todo.id } style={ style.item } >
                    <TodoEntry todo={ todo }
                        onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                        <ButtonGroup>
                            {btnOpenUrl}
                            <Button onClick={ () => onToggleTodoActiveClick( todo ) }><Glyphicon glyph='wrench' /></Button>
                            <Button onClick={ () => onDestroyClick(todo) }><Glyphicon glyph='trash' /></Button>
                        </ButtonGroup>
                    </TodoEntry>
                </ListGroupItem>
            )
        }
    )
    return (
        <div>
        { entries }
        </div>
    )
}

const style = {
    item: {
        border: 'none',
        padding: '5px 5px'
    }
}

TodoList.propTypes={
    todos: PropTypes.array.isRequired,
    active: PropTypes.object,
    onToggleTodoActiveClick: PropTypes.func, 
    onDestroyClick: PropTypes.func, 
    onOpenURL: PropTypes.func
}

export default TodoList