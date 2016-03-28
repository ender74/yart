import React, { Component } from 'react'
import {connect} from 'react-redux'

import TodoActions from './actions/TodosActions'

import BoundTodos from './BoundTodos'
import BoundToggleShowAll from './BoundToggleShowAll'
import BoundTodoDetails from './BoundTodoDetails'

const TodosView = ( { styleName, activeTodo, toggleActive, saveChanges, update } ) => {
    const detailsVisible = typeof activeTodo.id != 'undefined'
    const detailsStyle = detailsVisible ? styles.details : styles.hidden
    return <div style = { styles.main }>
            <BoundTodos style={ styles.list }>
                <BoundToggleShowAll />
            </BoundTodos>
            <BoundTodoDetails style={ detailsStyle } todo = { activeTodo } />
        </div>
}

const styles = {
    main: {
        display: 'flex'
    },

    list: {
        flexBasis: '60%'
    },
    
    details: {
        flexBasis: '40%'
    },

    hidden: {
        display: 'none'
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

const BoundTodosView = connect(mapStateToProps, mapDispatchToProps)(TodosView)

export default BoundTodosView