import React, { PropTypes, Component } from 'react'
import { ListGroup, ListGroupItem, ButtonToolbar, Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap'

import TodoEntry from './TodoEntry'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo => {
            var btnOpenUrl
            if (todo.url)
                btnOpenUrl = <Button onClick={ () => onOpenURL(todo) } tooltip='Link öffnen'><Glyphicon glyph='link' /></Button>

            entries.push(
                <TodoEntry key={ todo.id } todo={ todo } active={ active && active.id == todo.id }
                    onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                    <ButtonToolbar>
                        {btnOpenUrl}
                        <Button onClick={ () => onToggleTodoActiveClick( todo ) } tooltip='Eintrag bearbeiten'><Glyphicon glyph='wrench' /></Button>
                        <Button onClick={ () => onDestroyClick(todo) } tooltip='Eintrag löschen'><Glyphicon glyph='trash' /></Button>
                    </ButtonToolbar>
                </TodoEntry>
            )
        }
    )
    const styleName = active ? 'active' : 'default'
    return (
        <div>
        { entries }
        </div>
    )
}

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'row'
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