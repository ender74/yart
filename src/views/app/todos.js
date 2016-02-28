import React, { Component } from 'react'
import TodoTextInput from './components/todoTextInput'
import TodoList from './components/todoList'

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
        return <section className='todosArea'>
                <article className='todoList'>
                    <TodoTextInput id="new-todo" 
                        placeholder="What needs to be done?" 
                        onSave={this._onAddNew} />
                    <TodoList active={ this.state.active } todos={ this.state.allTodos } />
                </article>
                <aside className={this.state.active?'editTodoArea':'hidden'}>
                    <TodoTextInput id="edit-todo" 
                        defaultValue={ this.state.active ? this.state.active.text : ''} 
                        onSave={ this._onSaveEntryClick } />
                    <button className='editButton' onClick={ this._onSaveEntryClick }>u</button>
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

export default Todos