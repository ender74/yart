import React, { Component } from 'react'
import TodoEntry from './TodoEntry'

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
            <div style={ styles.base }>
            { entries }
            </div>
        )
    }
}

TodoList.propTypes={ 
    todos: React.PropTypes.object.isRequired 
}

var styles = {
    base: {
        width: '95%'
    }
}

export default TodoList