import Immutable from 'immutable'
import uuid from 'node-uuid'
import C from './TodosConstants'
import { Todo } from '../../Types'
import initialState from '../../initialState'

function todoAddNew(state, text) {
    const newTodo = new Todo({
        id: uuid.v4(),
        text: text,
        complete: false
    })
    state = state.set("todos", state.todos.push(newTodo))
    return state
}

function todoDestroy(state, todo) {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0)
        state = state.set("todos", state.todos.delete(indexFromState))
    return state
}

function todoUpdateProp(state, todo, prop, text) {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        state = state.set("todos", state.todos.set(indexFromState, todo.set(prop, text)))
    }
    return state
}

function todoUpdateActive(state, props) {
    if (state.activeTodo) {
        const indexFromState = state.todos.findIndex(t => t.id === state.activeTodo.id)
        if (indexFromState >= 0) {
            const todo = state.todos.get(indexFromState)
            state = state.set("todos", state.todos.set(indexFromState, todo.merge(props)))
        }
    }
    return state
}

function toggleComplete(state, todo) {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        state = state.set("todos", state.todos.set(indexFromState, todo.set("complete", !todo.complete)))
    }
    return state
}

function toggleActive(state, todo) {
    if (state.activeTodo && state.activeTodo.id === todo.id)
        state = state.remove("activeTodo")
    else {
        const indexFromState = state.todos.findIndex(t => t.id === todo.id)
        if (indexFromState >= 0)
            state = state.set("activeTodo", state.todos.get(indexFromState))
        else
            state = state.remove("activeTodo")
    }
    return state
}

function todoToggleShowAll(state) {
    state = state.set("showAll", !state.showAll)
    return state
}

function todosReducer(state,action){
    if (typeof state === 'undefined')
        state = initialState()
    switch (action.type) {
        case C.TODO_ADD_NEW:
            state=todoAddNew(state, action.text)
            break;
        case C.TODO_DESTROY:
            state=todoDestroy(state, action.todo)
            break;
        case C.TODO_TOGGLE_COMPLETE:
            state=toggleComplete(state, action.todo)
            break;
        case C.TODO_UPDATE_PROP:
            state=todoUpdateProp(state, action.todo, action.prop, action.text)
            break;
        case C.TODO_UPDATE_ACTIVE:
            state=todoUpdateActive(state, action.props)
            break;
        case C.TODO_TOGGLE_ACTIVE:
            state=toggleActive(state, action.todo)
            break;
        case C.TODO_TOGGLE_SHOWALL:
            state=todoToggleShowAll(state)
            break;
    }
    return state
}

export default todosReducer