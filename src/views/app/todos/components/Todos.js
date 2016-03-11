import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'
import ButtonBar from '../../components/ButtonBar'
import Button from '../../components/Button'

import TodoActions from '../../../../todoActions'

class Todos extends Component {
    constructor(props) {
        super(props)
        this._onAddNew = this._onAddNew.bind(this)
    }
    
    render() {
        return <section style={ [ this.props.style, styles.todosArea] }>
                <article style={ styles.todoList }>
                    <TodoTextInput
                        style={ styles.newTodoText }
                        placeholder="+ Einen neuen Eintrag hinzufügen" 
                        onSave={ this._onAddNew } />
                    <TodoList active={ this.props.activeTodo } todos={ this.props.allTodos } />
                </article>
            </section>
    }
    
    _onAddNew(text) {
        TodoActions.create(text)
    }
}

var styles = {
    todosArea: {
    },

    newTodoText: {
        background: 'rgba(0,200,255,0.7)',
        border: 'none',
        borderRadius: '10px',
        padding: '1.0em 0.5em 1.0em 0.5em',
        width: '100%'
    },

    todoList: {
    },
        
    buttonBar: {
        float: 'right'
    }
}

export default Radium(Todos)