import {connect} from 'react-redux'
import Radium from 'radium'

import Todos from './components/Todos'
import TodoActions from './actions/TodosActions'

function mapStateToPropsTodos(state) {
    //convert from immutable to plain JSON
    const todoState = JSON.parse(JSON.stringify(state.todos))
    const allTodos = todoState.todos ? todoState.todos : []
    const todos = state.todos.showAll ?
        allTodos : allTodos.filter(t => !t.complete)

    return {
        allTodos: todos,
        activeTodo: state.todos.activeTodo
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: todo => dispatch(TodoActions.toggleActive(todo)),
        toggleComplete: todo => dispatch(TodoActions.toggleComplete(todo)),
        addNewTodo: text => dispatch(TodoActions.addNewTodo(text)),
        destroyTodo: todo => dispatch(TodoActions.destroyTodo(todo)),
        openURL: todo => window.open(todo.url)
    }
}

const BoundTodos = connect(mapStateToPropsTodos, mapDispatchToProps)(Todos)

export default Radium(BoundTodos)