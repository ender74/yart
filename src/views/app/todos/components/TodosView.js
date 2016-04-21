import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'

import BoundTodos from '../BoundTodos'
import BoundToggleShowAll from '../BoundToggleShowAll'
import BoundTodoDetails from '../BoundTodoDetails'

const TodosView = ( { styleName, activeTodo, toggleActive, saveChanges, update } ) => {
    const detailsVisible = typeof activeTodo != 'undefined' && activeTodo.id
    var col1Styles = detailsVisible ? {xsHidden: true, sm: 8} : {sm: 12}
    var col2Styles = detailsVisible ? {sm:4} : {style: {'display': 'none'}}
    return (
        <Grid>
            <Row>
                <Col {...col1Styles}>
                    <BoundTodos>
                        <BoundToggleShowAll />
                    </BoundTodos>
                </Col>
                <Col {...col2Styles}>
                    <BoundTodoDetails todo = { activeTodo } />
                </Col>
            </Row>
        </Grid>
    )
}

export default TodosView