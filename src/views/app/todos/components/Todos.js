import React, { Component } from 'react'
import Radium from 'radium'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { style, allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL } ) => {
    return (
        <article style={style}>
            <TodoTextInput
                placeholder="+ Einen neuen Eintrag hinzufügen"
                onSubmitEditing={ addNewTodo } />
            <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
            { children }
        </article>
    )
}

export default Radium(Todos)