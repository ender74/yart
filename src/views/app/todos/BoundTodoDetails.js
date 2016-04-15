import {connect} from 'react-redux'
import Radium from 'radium'

import TodoDetails, { valuesToState } from './components/TodoDetails'
import TodosActions from './actions/TodosActions'

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
            dispatch(TodosActions.updateTodo(mergedTodo))
        },
        onClose: (todo) => dispatch(TodosActions.toggleActive(todo))
    }
}

const BoundTodoDetails = connect(mapStateToProps, mapDispatchToProps)(TodoDetails)

export default Radium(BoundTodoDetails)