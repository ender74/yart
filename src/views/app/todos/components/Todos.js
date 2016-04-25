import React, { Component } from 'react'
import Radium from 'radium'
import { injectIntl } from 'react-intl'
import { Grid, Row, Col} from 'react-bootstrap'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

const Todos = ( { style, allTodos, activeTodo, children, addNewTodo, toggleActive, toggleComplete, destroyTodo, openURL, intl } ) => {
    const placeholder = intl.formatMessage({
        id: 'todo.add_entry',
        defaultMessage: '+ add a new entry here'
    })

    return (
        <article style={style}>
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
        </article>
    )
}

export default Radium(injectIntl(Todos))