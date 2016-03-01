import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

import TodoTextInput from './components/todoTextInput'
import TodoList from './components/todoList'
import ButtonBar from './components/ButtonBar'
import Button from './components/Button'

import TodoStore from '../../todoStore'
import TodoActions from '../../todoActions'

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
        this._onSaveEntryClick = this._onSaveEntryClick.bind(this)
    }
    
    componentDidMount() { 
        TodoStore.addChangeListener(this._onChange) 
    }
    
    componentWillUnmount() { 
        TodoStore.removeChangeListener(this._onChange) 
    }
    
    render() {
        const todo = this.state.active
        const editAreaStyle = todo ? 'editTodoArea' : 'hidden'
        return <section style={ styles.todosArea }>
                <article style={ styles.todoList }>
                    <TodoTextInput
                        style={ styles.newTodoText }
                        placeholder="+ Einen neuen Eintrag hinzufügen" 
                        onSave={this._onAddNew} />
                    <TodoList active={ todo } todos={ this.state.allTodos } />
                </article>
                <aside style={ styles[editAreaStyle] }>
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ todo ? todo.text : ''} 
                        onSave={ this._onSaveEntryClick } />
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ todo ? todo.text : ''} 
                        onSave={ this._onSaveEntryClick } />
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ todo ? todo.text : ''} 
                        onSave={ this._onSaveEntryClick } />
                    <TodoTextInput
                        style={ styles.editText }
                        defaultValue={ todo ? todo.text : ''} 
                        onSave={ this._onSaveEntryClick } />
                    <ButtonBar style= { styles.buttonBar }>
                        <Button className='editButton' onClick={ this._onSaveEntryClick } text='U' />
                    </ButtonBar>
                </aside>
            </section>
    }
    
    _onChange() { 
        this.setState(getTodoState()) 
    }    
    
    _onAddNew(text) {
        TodoActions.create(text)
    }

    _onSaveEntryClick(text) {
        if (this.state.active)
            TodoActions.updateText(this.state.active.id, text)
        TodoActions.deactivate()
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
        'background': 'rgba(128,128,33,0.7)',
        'border': 'none',
        'border-radius': '1px',
        'box-shadow': '0px 0px 0px 8px rgba(128,128,33,0.7)', 
        'padding': '0.5em 0.5em 0.5em 0.5em',
        'margin': '0.5em 0.5em 0em 0.5em',
        'width': '95%'
    },

   todoList: {
        '-webkit-flex': '3 1 60%',
        'flex': '3 1 60%',
        '-webkit-order': '1',
        'order': '1'        
    },
    
    editTodoArea: {
        '-webkit-flex': '1 6 40%',
        'flex': '1 6 40%',
        '-webkit-order': '2',
        'order': '2',
        'background': 'rgba(228,228,228,0.5)',
        'display': '-webkit-flex',
        '-webkit-flex-direction': 'column',
        'display': 'flex',
        'flex-direction': 'column'
    },
    
    editText: {
        'background': 'rgba(128,128,128,0.5)',
        'border': 'none',
        'border-radius': '1px',
        'box-shadow': '0px 0px 0px 8px rgba(128,128,128,0.5)', 
        'padding': '0.5em 0.5em 0.5em 0.5em',
        'margin': '10px 10px 10px 10px'
    },

    hidden: {
        'display': 'none'
    },
    
    buttonBar: {
        'float': 'right'
    }
}

export default Radium(Todos)