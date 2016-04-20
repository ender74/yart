import React, { Component } from 'react'
import Radium from 'radium'
import { injectIntl } from 'react-intl'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { style, allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL, intl } ) => {
    const placeholder = intl.formatMessage({
        id: 'todo.add_entry',
        defaultMessage: '+ add a new entry here'
    })

    return (
        <article style={style}>
            <TodoTextInput
                placeholder={ placeholder }
                onSubmitEditing={ addNewTodo } />
            <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
            { children }
        </article>
    )
}

export default Radium(injectIntl(Todos))