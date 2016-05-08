import C from './TodosConstants'

import TagsActions from './TagsActions'
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
            const { todos: { activeTodo } } = getState()
            if (typeof activeTodo == 'undefined')
                return
            const tagInTodo = activeTodo.tags.findIndex(t => { return t.text == text })
            if (tagInTodo < 0) {
                dispatch(TagsActions.addTag(text, (tag) => {
                    dispatch({
                        type: C.TODO_ADD_TAG,
                        tag
                    })
                }))
            }
        }
    },

    removeTag(text) {
        return (dispatch, getState) => {
            const { todos: { activeTodo } } = getState()
            if (typeof activeTodo == 'undefined')
                return
            const tagInTodo = activeTodo.tags.findIndex(t => { return t.text == text })
            if (tagInTodo >= 0) {
                dispatch(TagsActions.destroyTag(text, (tag) => {
                    dispatch({
                        type: C.TODO_REMOVE_TAG,
                        tag
                    })
                }))
            }
        }
    }
}

export default TodosActions