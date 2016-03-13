import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'
import ButtonBar from '../../components/ButtonBar'
import Button from '../../components/Button'

const Todos = ( { style, allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL } ) => {
    return <section style={ [ style, styles.todosArea] }>
            <article style={ styles.todoList }>
                <TodoTextInput
                    style={ styles.newTodoText }
                    placeholder="+ Einen neuen Eintrag hinzufügen" 
                    onSubmitEditing={ addNewTodo } />
                <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                    onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
                { children }
            </article>
        </section>
}

var styles = {
    todosArea: {
    },

    newTodoText: {
        background: 'rgba(0,200,255,0.7)',
        border: 'none',
        borderRadius: '10px',
        padding: '1.0em 0.5em 1.0em 0.5em',
        width: '100%'
    },

    todoList: {
    },
        
    buttonBar: {
        float: 'right'
    }
}

export default Radium(Todos)