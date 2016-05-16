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
    
    toggleShowAll() {
        return {
            type: C.TODO_TOGGLE_SHOWALL  
        }    
    },
    
    toggleActive(todo) {
        return {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: todo
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

    addTag(text) {
        return (dispatch, getState) => {
            const activeTodo = activeTodoSelector(getState())
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
                            tag
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

    removeTag(text) {
        return (dispatch, getState) => {
            const { tags } = getState()
            const oldTagIdx = tags.tags.findIndex(t => { return t.text == text })
            if (oldTagIdx >= 0) {
                const oldTag = tags.tags.get(oldTagIdx)
                const activeTodo = activeTodoSelector(getState())
                if (typeof activeTodo.id == 'undefined')
                    return
                const tagInTodo = activeTodo.tags.findIndex(t => { return t.text == oldTag.text })
                if (tagInTodo >= 0) {
                    dispatch(TagsActions.destroyTag(oldTag, (tag) => {
                        dispatch({
                            type: C.TODO_REMOVE_TAG,
                            tag
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