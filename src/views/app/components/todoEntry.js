import React, { Component } from 'react'

import TodoActions from '../../../todoActions'

class TodoEntry extends Component {
    constructor(props) {
        super(props)
        this._onDestroyClick=this._onDestroyClick.bind(this)
    }
    render() {
        const todo = this.props.todo
        return <li key={todo.id}> 
            <label> {todo.text} </label> 
            <button className="destroy" onClick={this._onDestroyClick}>x</button> 
        </li>
    }
    
    _onDestroyClick() { 
        TodoActions.destroy(this.props.todo.id) 
    }
}

export default TodoEntry