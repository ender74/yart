import React, { Component } from 'react'
import {connect} from 'react-redux'

import TodoToggleShowAll from './components/TodoToggleShowAll'
import TodosActions from './actions/TodosActions'

function mapStateToPropsTodos(state) {
    return {
        defaultChecked: state.todos.showAll
    }
}

var mapDispatchToProps = function(dispatch) {
    return {
        toggleShowAll: () => dispatch(TodosActions.toggleShowAll())
    }
}

const BoundToggleShowAll = connect(mapStateToPropsTodos, mapDispatchToProps)(TodoToggleShowAll)

export default BoundToggleShowAll