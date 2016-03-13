import {connect} from 'react-redux'

import TodoDetails, { valuesToState } from './components/TodoDetails'
import TodoActions from './actions/todosActions'

function mapStateToPropsTodos(state) {
    return state.todos.activeTodo ? state.todos.activeTodo : {}
}

var mapDispatchToProps = function(dispatch) { 
    return {
        onUpdate: (todo, prop, text) => dispatch(TodoActions.updateTodoProp(todo, prop, text)),
        onSubmit: (values) => dispatch(TodoActions.updateActiveTodo(valuesToState(values))),
        onClose: (todo) => dispatch(TodoActions.toggleActive(todo))
    }
}

const BoundTodoDetails = connect(mapStateToPropsTodos, mapDispatchToProps)(TodoDetails)

export default BoundTodoDetails