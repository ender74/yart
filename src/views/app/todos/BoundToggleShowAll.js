import React, { Component } from 'react'
import {connect} from 'react-redux'

import TodoToggleShowAll from './components/TodoToggleShowAll'
import TodosActions from './actions/TodosActions'
import { showAllSelector } from './actions/TodosSelector'

function mapStateToPropsTodos(state) {
    const defaultChecked = showAllSelector(state)

    return {
        defaultChecked
    }
}

var mapDispatchToProps = function(dispatch) {
    return {
        toggleShowAll: () => dispatch(TodosActions.toggleShowAll())
    }
}

const BoundToggleShowAll = connect(mapStateToPropsTodos, mapDispatchToProps)(TodoToggleShowAll)

export default BoundToggleShowAll