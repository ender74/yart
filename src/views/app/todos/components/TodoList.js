import React, { PropTypes, Component } from 'react'
import { Grid, Col, Row, DropdownButton, MenuItem, Nav, NavItem, Glyphicon } from 'react-bootstrap'

import TodoEntry from './TodoEntry'

const TodoList = ( { todos, active, onToggleTodoActiveClick, onToggleTodoCompleteClick, onDestroyClick, onOpenURL } ) => {
    if (todos === undefined || Object.keys(todos).length < 1) {
        return <div/>
    }
    var entries = []

    todos.forEach(todo => {
            var btnOpenUrl, btnOpenUrlMenu
            if (todo.url) {
                btnOpenUrl = <NavItem onClick={ () => onOpenURL(todo) }><Glyphicon glyph='link' /></NavItem>
                btnOpenUrlMenu = <MenuItem onClick={ () => onOpenURL(todo) }><Glyphicon glyph='link' /></MenuItem>
            }

            entries.push(
                <Row>
                    <Col xs={ 9 } sm={ 9 }>
                        <TodoEntry key={ todo.id } todo={ todo } active={ active && active.id == todo.id }
                            onToggleCompleteClick={ () => onToggleTodoCompleteClick( todo ) }>
                        </TodoEntry>
                    </Col>
                    <Col xsHidden smPush={ 3 }>
                        <Nav bsStyle="pills" pullRight>
                            {btnOpenUrl}
                            <NavItem onClick={ () => onToggleTodoActiveClick( todo ) }><Glyphicon glyph='wrench' /></NavItem>
                            <NavItem onClick={ () => onDestroyClick(todo) }><Glyphicon glyph='trash' /></NavItem>
                        </Nav>
                    </Col>
                    <Col xsPush={ 3 } smHidden mdHidden lgHidden>
                        <Grid  style={{float: 'right'}}>
                            <DropdownButton bsStyle='default'>
                                {btnOpenUrlMenu}
                                <MenuItem onClick={ () => onToggleTodoActiveClick( todo ) }><Glyphicon glyph='wrench' /></MenuItem>
                                <MenuItem onClick={ () => onDestroyClick(todo) }><Glyphicon glyph='trash' /></MenuItem>
                            </DropdownButton>
                        </Grid>
                    </Col>
                </Row>
            )
        }
    )
    return (
        <div>
        { entries }
        </div>
    )
}

TodoList.propTypes={
    todos: PropTypes.object.isRequired,
    active: PropTypes.object,
    onToggleTodoActiveClick: PropTypes.func, 
    onDestroyClick: PropTypes.func, 
    onOpenURL: PropTypes.func
}

export default TodoList