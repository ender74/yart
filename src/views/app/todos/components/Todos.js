import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL } ) => {
    return (
        <Grid>
            <article>
                <TodoTextInput
                    style={ style.newTodo }
                    placeholder="+ Einen neuen Eintrag hinzufügen"
                    onSubmitEditing={ addNewTodo } />
                <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                    onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
                { children }
            </article>
        </Grid>
    )
}

const style = {
    newTodo: {
        width: '100%'
    }
}

export default Todos