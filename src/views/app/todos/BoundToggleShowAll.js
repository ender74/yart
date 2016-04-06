import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Input } from 'react-bootstrap'

import TodosActions from './actions/TodosActions'

const ToggleShowAll = ( { defaultChecked, toggleShowAll } ) => {
    return <div style={ styles.chk }><Input type='checkbox' onClick={ toggleShowAll }
                  defaultChecked={ defaultChecked } label='Alle zeigen'/></div>
}

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

const BoundToggleShowAll = connect(mapStateToPropsTodos, mapDispatchToProps)(ToggleShowAll)

const styles = {
    chk: {
        'marginTop': '10px'
    }
}

export default BoundToggleShowAll