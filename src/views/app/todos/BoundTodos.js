import {connect} from 'react-redux'
import Radium from 'radium'

import Todos from './components/Todos'
import TodosActions from './actions/TodosActions'

function mapStateToPropsTodos(state) {
    const todoState = state.todos
    const allTodos = todoState.todos ? todoState.todos : []
    const todos = state.todos.showAll ?
        allTodos : allTodos.filter(t => !t.complete)

    return {
        allTodos: todos ? todos.toArray() : [], //convert from immutable to plain JSON
        activeTodo: state.todos.activeTodo
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        toggleActive: todo => dispatch(TodosActions.toggleActive(todo)),
        toggleComplete: todo => dispatch(TodosActions.toggleComplete(todo)),
        addNewTodo: text => dispatch(TodosActions.addNewTodo(text)),
        destroyTodo: todo => dispatch(TodosActions.destroyTodo(todo)),
        openURL: todo => window.open(todo.url)
    }
}

const BoundTodos = connect(mapStateToPropsTodos, mapDispatchToProps)(Todos)

export default Radium(BoundTodos)