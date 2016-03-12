import {connect} from 'react-redux'

import Todos from './components/Todos'
import TodoActions from './actions/todosActions'

function mapStateToPropsTodos(state) {
    const todos = state.todos.showAll ? 
        state.todos.todos : state.todos.todos.filter(t => !t.complete)  

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

export default BoundTodos