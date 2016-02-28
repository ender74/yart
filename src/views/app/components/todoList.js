import React, { Component } from 'react'
import TodoEntry from './todoEntry'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        if (Object.keys(this.props.todos).length < 1) {
            return null
        }
        var allTodos = this.props.todos
        var entries = []

        for (var key in allTodos) {
            const todo = allTodos[key]
            entries.push(<TodoEntry key={key} todo={todo} active={this.props.active==todo}/>)
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