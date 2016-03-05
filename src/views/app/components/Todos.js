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
                <article style={ styles.todoList }>
                    <TodoTextInput
                        style={ styles.newTodoText }
                        placeholder="+ Einen neuen Eintrag hinzufügen" 
                        onSave={this._onAddNew} />
                    <TodoList active={ todo } todos={ this.state.allTodos } />
                </article>
                <TodoDetails {...todo }/>
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
        'display': '-webkit-flex',
        '-webkit-flex-direction': 'row',
        'display': 'flex',
        'flex-direction': 'row'
    },

    newTodoText: {
        'background': 'rgba(220,220,110,0.7)',
        'border': 'none',
        'border-radius': '10px',
        'padding': '1.0em 0.5em 1.0em 0.5em',
        'margin': '0em 0em 0em 0.5em',
        'width': '95%'
    },

   todoList: {
        '-webkit-flex': '3 1 60%',
        'flex': '3 1 60%',
        '-webkit-order': '1',
        'order': '1'        
    },
        
    buttonBar: {
        'float': 'right'
    }
}

export default Radium(Todos)