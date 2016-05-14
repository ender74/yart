import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { Grid, Row, Col} from 'react-bootstrap'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL, intl } ) => {
    const placeholder = intl.formatMessage({
        id: 'todo.add_entry',
        defaultMessage: '+ add a new entry here'
    })

    return (
        <Grid fluid>
            <Row>
                <Col>
                    <TodoTextInput
                        placeholder={ placeholder }
                        onSubmitEditing={ addNewTodo }
                        style={{marginBottom: '10px'}} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                        onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
                </Col>
            </Row>
            <Row>
                <Col>
                    { children }
                </Col>
            </Row>
        </Grid>
    )
}

export default injectIntl(Todos)