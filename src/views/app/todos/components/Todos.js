import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'
import ButtonBar from '../../components/ButtonBar'
import Button from '../../components/Button'

const Todos = ( { allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL } ) => {
    return (
        <Grid>
            <article>
                <TodoTextInput
                    placeholder="+ Einen neuen Eintrag hinzufügen"
                    onSubmitEditing={ addNewTodo } />
                <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                    onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
                { children }
            </article>
        </Grid>
    )
}

export default Todos