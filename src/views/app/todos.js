import React, { Component } from 'react'
import TodoTextInput from './components/todoTextInput'
import TodoList from './components/todoList'

import TodoStore from '../../todoStore'
import TodoActions from '../../todoActions'

function getTodoState() {
    return {
        allTodos: TodoStore.getAll()
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
        return <section id='main'>
                <TodoTextInput id="new-todo" 
                    placeholder="What needs to be done?" 
                    onSave={this._onAddNew} />
                <TodoList todos={ this.state.allTodos } />
            </section>
    }
    
    _onChange() { 
        this.setState(getTodoState()) 
    }    
    
    _onAddNew(text) {
        TodoActions.create(text)
    }
}

export default Todos