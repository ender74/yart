import React, { Component } from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import TodoActions from './actions/TodosActions'

const ToggleShowAll = ( { defaultChecked, toggleShowAll } ) => {
    return <div><input style={ styles.chk } type='checkbox' 
                        onClick={ toggleShowAll } 
                        defaultChecked={ defaultChecked }/>Alle zeigen</div>
}

function mapStateToPropsTodos(state) {
    return {
        defaultChecked: state.todos.showAll
    }
}

var mapDispatchToProps = function(dispatch) {
    return {
        toggleShowAll: () => dispatch(TodoActions.toggleShowAll())
    }
}

const BoundToggleShowAll = connect(mapStateToPropsTodos, mapDispatchToProps)(Radium(ToggleShowAll))

const styles = {
    chk: {
        'marginTop': '10px'
    }
}

export default BoundToggleShowAll