import React, { Component } from 'react'
import TodoEntry from './todoEntry'

class TodoList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (Object.keys(this.props.todos).length < 1) {
            return null
        }
        var allTodos = this.props.todos
        var entries = []

        for (var key in allTodos) {
            entries.push(<TodoEntry key={key} todo={allTodos[key]} />)
        }
        
        return(
            <ul id='todo-list'>
            { entries }
            </ul>
        )
    }
}

TodoList.propTypes={ 
    todos: React.PropTypes.object.isRequired 
}

export default TodoList