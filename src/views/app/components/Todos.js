import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'
import ButtonBar from './ButtonBar'
import Button from './Button'

import TodoStore from '../../../todoStore'
import TodoActions from '../../../todoActions'

function getTodoState() {
    return {
        allTodos: TodoStore.getAll(),
        active: TodoStore.getActive()
    }
}

class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = getTodoState()
        this._onChange = this._onChange.bind(this)
        this._onAddNew = this._onAddNew.bind(this)
    }
    
    componentDidMount() { 
        TodoStore.addChangeListener(this._onChange) 
    }
    
    componentWillUnmount() { 
        TodoStore.removeChangeListener(this._onChange) 
    }
    
    render() {
        const todo = this.state.active
        return <section style={ styles.todosArea }>
                <article style={ todo ?  styles.todoList.active : styles.todoList.default }>
                    <TodoTextInput
                        style={ styles.newTodoText }
                        placeholder="+ Einen neuen Eintrag hinzufügen" 
                        onSave={this._onAddNew} />
                    <TodoList active={ todo } todos={ this.state.allTodos } />
                </article>
                <TodoDetails style = { todo ? styles.editTodoArea : styles.hidden } {...todo }/>
            </section>
    }
    
    _onChange() { 
        this.setState(getTodoState()) 
    }    
    
    _onAddNew(text) {
        TodoActions.create(text)
    }
}

var styles = {
    todosArea: {
    },

    newTodoText: {
        'background': 'rgba(0,200,255,0.7)',
        'border': 'none',
        'border-radius': '10px',
        'padding': '1.0em 0.5em 1.0em 0.5em',
        'width': '95%'
    },

    todoList: {
        'default': {
            'width': '100%'
        },
        'active': {
            'width': '60%'
        }
    },
        
    buttonBar: {
        'float': 'right'
    },
    
    editTodoArea: {
        'background': 'rgba(255,255,255,0.3)',
        'width': '40%',
        'position': 'fixed',
        'top': '60px',
        'left': '60%',
        'display': 'flex',
        'flex-direction': 'column'
    },
    
    hidden: {
        'display': 'none'
    },
}

export default Radium(Todos)