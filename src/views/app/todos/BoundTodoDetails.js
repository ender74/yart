import {connect} from 'react-redux'

import TodoDetails, { valuesToState } from './components/TodoDetails'
import TodosActions from './actions/TodosActions'
import { activeTodoSelector } from './actions/TodosSelector'

function mapStateToProps(state) {
    const activeTodo = activeTodoSelector(state)

    return {
        todo: activeTodo,
        tags: activeTodo.tags || []
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