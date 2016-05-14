import {connect} from 'react-redux'

import TodoDetails, { valuesToState } from './components/TodoDetails'
import TodosActions from './actions/TodosActions'

function mapStateToProps(state) {
    return {
        todo: state.todos.activeTodo ? state.todos.activeTodo : {},
        tags: state.todos.activeTodo ? state.todos.activeTodo.tags : []
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
        onClose: (todo) => dispatch(TodosActions.toggleActive(todo)),
        onAddTag: (text) => dispatch(TodosActions.addTag(text)),
        onRemoveTag: (text) => dispatch(TodosActions.removeTag(text))
    }
}

const BoundTodoDetails = connect(mapStateToProps, mapDispatchToProps)(TodoDetails)

export default BoundTodoDetails