import React, { Component } from 'react'

import { Checkbox, Grid, Row, Col} from 'react-bootstrap'

const TodoEntry = ( { todo, children, active, onToggleCompleteClick } ) => {
    return (
        <Checkbox bsStyle='success' onClick={ onToggleCompleteClick } readOnly checked={ todo.complete }>
            { todo.text }
        </Checkbox>
    )
}

export default TodoEntry