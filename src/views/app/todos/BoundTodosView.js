import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Radium from 'radium'

import TodosActions from './actions/TodosActions'

import TodoToggleShowAll from './components/TodoToggleShowAll'

import BoundTodos from './BoundTodos'
import BoundTodoDetails from './BoundTodoDetails'

const TodosView = ( { styleName, activeTodo, defaultChecked, toggleActive, toggleShowAll, saveChanges, update } ) => {
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
                                <TodoToggleShowAll defaultChecked = { defaultChecked } toggleShowAll = { toggleShowAll } />
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
        activeTodo: state.todos.activeTodo ? state.todos.activeTodo.toObject() : {},
        defaultChecked: state.todos.showAll
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: (todo) => dispatch(TodosActions.toggleActive(todo)),
        toggleShowAll: () => dispatch(TodosActions.toggleShowAll())
    }
}

const BoundTodosView = connect(mapStateToProps, mapDispatchToProps)(TodosView)

export default Radium(BoundTodosView)