import React, { Component } from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import TodoActions from './actions/TodosActions'

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
            <BoundTodoDetails style={ styles.details[styleName] } todo = { activeTodo } />
        </div>
}

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

function mapStateToProps(state) {
    return {
        styleName: state.todos.activeTodo ? 'active' : 'default',
        activeTodo: state.todos.activeTodo ? state.todos.activeTodo.toObject() : {}
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: (todo) => dispatch(TodoActions.toggleActive(todo))
    }
}

const BoundTodosView = connect(mapStateToProps, mapDispatchToProps)(Radium(TodosView))

export default BoundTodosView