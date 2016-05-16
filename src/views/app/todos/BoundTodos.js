import {connect} from 'react-redux'

import Todos from './components/Todos'
import TodosActions from './actions/TodosActions'
import { visibleTodosSelector, activeTodoSelector } from './actions/TodosSelector'

function mapStateToProps(state) {
    const allTodos = visibleTodosSelector(state)
    const activeTodo = activeTodoSelector(state)

    return {
        allTodos,
        activeTodo
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

const BoundTodos = connect(mapStateToProps, mapDispatchToProps)(Todos)

export default BoundTodos