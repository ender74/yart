import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { Grid, Row, Col} from 'react-bootstrap'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { locale, allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL } ) => {
    return (
        <Grid fluid>
            <Row>
                <Col>
                    <TodoTextInput
                        locale={ locale }
                        onSubmitEditing={ addNewTodo }
                        style={{marginBottom: '10px'}} />
                </Col>
            </Row>
            <Row>
                <Col>
                    { children }
                </Col>
            </Row>
            <Row>
                <Col>
                    <TodoList active={ activeTodo } todos={ allTodos } onToggleTodoCompleteClick={ toggleComplete }
                        onToggleTodoActiveClick={ toggleActive } onDestroyClick={ destroyTodo } onOpenURL={ openURL } />
                </Col>
            </Row>
        </Grid>
    )
}

export default Todos