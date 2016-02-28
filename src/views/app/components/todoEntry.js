import React, { Component } from 'react'

import TodoActions from '../../../todoActions'

class TodoEntry extends Component {
    constructor(props) {
        super(props)
        this._onDestroyClick=this._onDestroyClick.bind(this)
        this._onActivateClick=this._onActivateClick.bind(this)
    }
    render() {
        const todo = this.props.todo
        return <li key={todo.id}> 
            <label className={this.props.active?"activeTodoEntry":"todoEntry"} onClick={this._onActivateClick}> {todo.text} </label> 
            <button className='editButton' onClick={this._onDestroyClick}>x</button> 
        </li>
    }
    
    _onActivateClick() { 
        TodoActions.activate(this.props.todo.id) 
    }

    _onDestroyClick() { 
        TodoActions.destroy(this.props.todo.id) 
    }
}

export default TodoEntry