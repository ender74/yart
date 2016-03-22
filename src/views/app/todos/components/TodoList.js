import React, { PropTypes, Component } from 'react'

import TodoEntry from './TodoEntry'
import Button from '../../components/Button'
import ButtonBar from '../../components/ButtonBar'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo =>
        entries.push(<TodoEntry key={ todo.id } todo={ todo } active={ active && active.id == todo.id }
            onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
            <ButtonBar style= { styles.buttonBar }>
                <Button hidden = { !todo.url } onClick={ () => onOpenURL(todo) } tooltip='Link öffnen' image="images/link-button.svg" />
                <Button onClick={ () => onToggleTodoActiveClick( todo ) } tooltip='Eintrag bearbeiten' image="images/black-wrench.svg" />
                <Button onClick={ () => onDestroyClick(todo) } tooltip='Eintrag löschen' image="images/delete-button.svg" />
            </ButtonBar>
        </TodoEntry>
        )
    )

    return(
        <div style={ styles.base }>
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

var styles = {
    base: {
        width: '100%'
    },
    buttonBar: {
        'float': 'right'
    }
}

export default TodoList