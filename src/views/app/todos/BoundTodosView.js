import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Radium from 'radium'

import TodosActions from './actions/TodosActions'

import BoundTodos from './BoundTodos'
import BoundToggleShowAll from './BoundToggleShowAll'
import BoundTodoDetails from './BoundTodoDetails'

const TodosView = ( { styleName, activeTodo, toggleActive, saveChanges, update } ) => {
    const detailsVisible = typeof activeTodo != 'undefined' && activeTodo.id
    var col1Styles = detailsVisible ? {xsHidden: true, sm: 8} : {sm: 12}
    var col2Styles = detailsVisible ? {sm:4} : {style: {'display': 'none'}}
    return (
        <Grid>
            <Row>
                <Col {...col1Styles}>
                    <Row>
                        <Col>
                            <BoundTodos>
                                <BoundToggleShowAll />
                            </BoundTodos>
                        </Col>
                    </Row>
                </Col>
                <Col {...col2Styles}>
                    <BoundTodoDetails todo = { activeTodo } />
                </Col>
            </Row>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {
        styleName: state.todos.activeTodo ? 'active' : 'default',
        activeTodo: state.todos.activeTodo ? state.todos.activeTodo.toObject() : {}
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: (todo) => dispatch(TodosActions.toggleActive(todo))
    }
}

const BoundTodosView = connect(mapStateToProps, mapDispatchToProps)(TodosView)

export default Radium(BoundTodosView)