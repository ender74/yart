import {connect} from 'react-redux'

import TodoDetails, { valuesToState } from './components/TodoDetails'
import TodoActions from './actions/TodosActions'

function mapStateToProps(state) {
    return {
        todo: state.todos.activeTodo ? state.todos.activeTodo.toJSON() : {}
    }
}

var mapDispatchToProps = function(dispatch) {
    return {
        onUpdate: (todo, values) => {
            const mergedTodo = valuesToState(values)
            for (var key in todo)
                if (typeof mergedTodo[key] == 'undefined')
                    mergedTodo[key] = todo[key]
            dispatch(TodoActions.updateTodo(mergedTodo))
        },
        onClose: (todo) => dispatch(TodoActions.toggleActive(todo))
    }
}

const BoundTodoDetails = connect(mapStateToProps, mapDispatchToProps)(TodoDetails)

export default BoundTodoDetails