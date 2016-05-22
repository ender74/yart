import C from './TodosConstants'

import TagsActions from './TagsActions'
import { activeTodoSelector } from './TodosSelector'
import { loadTodosBackend, createTodoBackend, destroyTodoBackend, updateTodoBackend } from './TodosBackend'

function _toggleComplete(todo) {
    return {
        type: C.TODO_TOGGLE_COMPLETE,
        todo: todo
    }
}

function _destroyTodo(oldTodo) {
    return {
         type: C.TODO_DESTROY,
         todo: oldTodo
    }
}

function _updateTodo(todo) {
    return {
        type: C.TODO_UPDATE,
        todo: todo
    }
}

function _loadTodos(todos) {
    return {
        type: C.TODO_LOAD,
        todos: todos
    }
}

const TodosActions = {
    addNewTodo(text) {
        return (dispatch) => {
            const newTodo = {
                text: text,
                complete: "false"
            }

            createTodoBackend(newTodo,
                (todo) => {
                    dispatch({
                        type: C.TODO_ADD_NEW,
                        todo: todo
                    })
                    dispatch(TodosActions.toggleActive(todo))
                },
                (error) => alert(error)
            )
        }
    },

    load() {
        return (dispatch) => {
            loadTodosBackend(
                (todos) => dispatch(_loadTodos(todos)),
                (todos, error) => alert(error)
            )
        }
    },
    
    addFilter(filter) {
        return {
            type: C.TODO_ADD_FILTER,
            filter
        }    
    },
    
    removeFilter(filter) {
        return {
            type: C.TODO_REMOVE_FILTER,
            filter
        }
    },

    toggleActive(todo) {
        return {
            type: C.TODO_TOGGLE_ACTIVE,
            todo
        }
    },

    toggleComplete(completedTodo) {
        return TodosActions.updateTodo(
            Object.assign({}, JSON.parse(JSON.stringify(completedTodo)), {
                complete: !completedTodo.complete
            })
        )
    },

    destroyTodo(oldTodo) {
        return (dispatch) => {
            destroyTodoBackend(oldTodo,
                (todo) => dispatch(_destroyTodo(todo)),
                (error) => alert(error)
            )
        }
    },
    
    updateTodo(newTodo) {
        return (dispatch) => {
            updateTodoBackend(newTodo,
                (todo) => dispatch(_updateTodo(todo)),
                (error) => alert(JSON.stringify(error))
            )
        }
    },

    addTag(activeTodo, text) {
        return (dispatch, getState) => {
            if (typeof activeTodo.id == 'undefined')
                return
            const tags = text.split(' ')
            for (const key in tags) {
                const tag = tags[key]
                const tagInTodo = activeTodo.tags.findIndex(t => { return t.text == tag })
                if (tagInTodo < 0) {
                    dispatch(TagsActions.addTag(tag, (tag) => {
                        dispatch({
                            type: C.TODO_ADD_TAG,
                            tag,
                            todo: activeTodo
                        })
                        const newTodo = activeTodoSelector(getState())
                        updateTodoBackend(newTodo,
                            (todo) => {},
                            (error) => alert(JSON.stringify(error))
                        )
                    }))
                }
            }
        }
    },

    removeTag(activeTodo, text) {
        return (dispatch, getState) => {
            if (typeof activeTodo.id == 'undefined')
                return
            const { tags } = getState()
            const oldTagIdx = tags.tags.findIndex(t => { return t.text == text })
            if (oldTagIdx >= 0) {
                const oldTag = tags.tags.get(oldTagIdx)
                const tagInTodo = activeTodo.tags.findIndex(t => { return t.text == oldTag.text })
                if (tagInTodo >= 0) {
                    dispatch(TagsActions.destroyTag(oldTag, (tag) => {
                        dispatch({
                            type: C.TODO_REMOVE_TAG,
                            tag,
                            todo: activeTodo
                        })
                        const newTodo = activeTodoSelector(getState())
                        updateTodoBackend(newTodo,
                            (todo) => {},
                            (error) => alert(JSON.stringify(error))
                        )
                    }))
                }
            }
        }
    }
}

export default TodosActions