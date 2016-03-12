import React, { Component } from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import TodoActions from './actions/todosActions'

import BoundTodos from './BoundTodos'
import BoundToggleShowAll from './BoundToggleShowAll'
import BoundTodoDetails from './BoundTodoDetails'
import ButtonBar from '../components/ButtonBar'
import Button from '../components/Button'

const TodosView = ( { styleName, activeTodo, toggleActive, saveChanges, update } ) => {
    return <div> 
            <BoundTodos style={ styles.list[styleName] }>
                <BoundToggleShowAll />
            </BoundTodos>
            <BoundTodoDetails style={ styles.details[styleName] } update = { update } todo = { activeTodo } />
        </div>
}

function mapStateToPropsTodos(state) {
    return {
        styleName: state.todos.activeTodo ? 'active' : 'default',
        activeTodo: state.todos.activeTodo
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: (todo) => dispatch(TodoActions.toggleActive(todo)), 
        update: (todo, prop, text) => dispatch(TodoActions.updateTodoProp(todo, prop, text))
    }
}

const BoundTodosView = connect(mapStateToPropsTodos, mapDispatchToProps)(Radium(TodosView))

const styles = {
    list: {
        default: {
            width: '100%'
        },
        
        active: {
            width: '60%'
        }
    },
    
    details: {
        default: {
            display: 'none'            
        },
        
        active: {
            position: 'fixed',
            width: '38%',
            top: '60px',
            right: '10px'
        }
    }
}

export default BoundTodosView