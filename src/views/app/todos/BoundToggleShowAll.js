import React, { Component } from 'react'
import {connect} from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Checkbox } from 'react-bootstrap'

import TodosActions from './actions/TodosActions'

const ToggleShowAll = ( { defaultChecked, toggleShowAll } ) => {
    return (
        <div style={ styles.chk }>
            <Checkbox onClick={ toggleShowAll } defaultChecked={ defaultChecked }>
                <FormattedMessage
                    id='todo.toggle_show_all'
                    defaultMessage='show all'
                />
            </Checkbox>
        </div>
    )
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