import React, { PropTypes, Component } from 'react'

import TodoEntry from './TodoEntry'
import Button from '../../components/Button'
import ButtonBar from '../../components/ButtonBar'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    for (var key in todos) {
        const todo = todos[key]
        entries.push(<TodoEntry key={ key } todo={ todo } active={ active==todo } 
            onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
            <ButtonBar style= { styles.buttonBar }> 
                <Button hidden = { !todo.url } onClick={ () => onOpenURL(todo) } tooltip='Link öffnen' image="icons/link-button.svg" />
                <Button onClick={ () => onToggleTodoActiveClick( todo ) } tooltip='Eintrag bearbeiten' image="icons/black-wrench.svg" />
                <Button onClick={ () => onDestroyClick(todo) } tooltip='Eintrag löschen' image="icons/delete-button.svg" />
            </ButtonBar>
        </TodoEntry>
        )
    }
    
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