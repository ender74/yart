import React, { Component } from 'react'
import TodoEntry from './TodoEntry'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'showAll': false
        }
        this._toggleShowAll=this._toggleShowAll.bind(this)
    }
    render() {
        if (Object.keys(this.props.todos).length < 1) {
            return null
        }
        var allTodos = this.props.todos
        var entries = []

        for (var key in allTodos) {
            const todo = allTodos[key]
            if (this.filterTodo(todo))
                entries.push(<TodoEntry key={key} todo={todo} active={this.props.active==todo}/>)
        }
        
        return(
            <div style={ styles.base }>
            { entries }
            <input style={ styles.chk } type='checkbox' onClick={this._toggleShowAll} />Alle zeigen
            </div>
        )
    }
    
    _toggleShowAll() {
        this.setState({
            'showAll': !this.state.showAll
        })
    }
    
    filterTodo(todo) {
        return this.state.showAll || !todo.complete
    }
}

TodoList.propTypes={ 
    todos: React.PropTypes.object.isRequired 
}

var styles = {
    base: {
        width: '100%'
    },
    chk: {
        'marginTop': '10px'
    }
}

export default TodoList