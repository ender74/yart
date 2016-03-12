import {connect} from 'react-redux'

import TodoDetails from './components/TodoDetails'
import TodoActions from './actions/todosActions'

function mapStateToPropsTodos(state) {
    return {
        todo: state.todos.activeTodo ? state.todos.activeTodo : {}
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        onUpdate: (todo, prop, text) => dispatch(TodoActions.updateTodoProp(todo, prop, text)),
        onSubmit: (val) => dispatch(TodoActions.updateActiveTodo(val)),
        onClose: (todo) => dispatch(TodoActions.toggleActive(todo))
    }
}

const BoundTodoDetails = connect(mapStateToPropsTodos, mapDispatchToProps)(TodoDetails)

export default BoundTodoDetails