import React, { Component } from 'react'

import { Checkbox, Grid, Row, Col} from 'react-bootstrap'

const TodoEntry = ( { todo, children, active, onToggleCompleteClick } ) => {
    return (
        <Row>
            <Col xs={ 8 }>
                <Checkbox bsStyle='success' onClick={ onToggleCompleteClick } readOnly checked={ todo.complete }>
                    { todo.text }
                </Checkbox>
            </Col>
            <Col xsPush={ 4 }>
                { children }
            </Col>
        </Row>
    )
}

export default TodoEntry