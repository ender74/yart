import React, { Component } from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

import TodoActions from './actions/TodosActions'

import TodosView from './components/TodosView'

function mapStateToProps(state) {
    return {
        styleName: state.todos.activeTodo ? 'active' : 'default',
        activeTodo: state.todos.activeTodo ? state.todos.activeTodo.toObject() : {}
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: (todo) => dispatch(TodoActions.toggleActive(todo))
    }
}

const BoundTodosView = connect(mapStateToProps, mapDispatchToProps)(TodosView)

export default Radium(BoundTodosView)