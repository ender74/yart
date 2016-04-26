import Immutable from 'immutable'

import C from './TodosConstants'
import { Todo, TodoList, TodoState } from './Types'

const addTodo = (state, newTodo) => {
    return state.set('todos', state.todos.push(newTodo))
}

const todoAddNew = (state, todo)  => {
    const newTodo = new Todo(todo)
    state = addTodo(state, newTodo)
    return state
}

const todoLoad = (state, todos) => {
    state = state.set('todos', new TodoList())
    for (var key in todos)
        state = addTodo(state, new Todo(todos[key]))
    return state
}

const todoDestroy = (state, todo) => {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0)
        state = state.set('todos', state.todos.delete(indexFromState))
    return state
}

const todoUpdate = (state, newTodo) => {
    const indexFromState = state.todos.findIndex(t => t.id === newTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        state = state.set('todos', state.todos.set(indexFromState, todo.merge(newTodo)))
    }
    return state
}

const toggleComplete = (state, todo) => {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        state = state.set('todos', state.todos.set(indexFromState, todo.set('complete', !todo.complete)))
    }
    return state
}

const toggleActive = (state, todo) => {
    if (state.activeTodo && state.activeTodo.id === todo.id)
        state = state.remove('activeTodo')
    else {
        const indexFromState = state.todos.findIndex(t => t.id === todo.id)
        if (indexFromState >= 0)
            state = state.set('activeTodo', state.todos.get(indexFromState))
        else
            state = state.remove('activeTodo')
    }
    return state
}

function todoListReducer(state, action) {
    switch (action.type) {
        case C.TODO_ADD_NEW:
            return todoAddNew(state, action.todo)
        case C.TODO_DESTROY:
            return todoDestroy(state, action.todo)
        case C.TODO_LOAD:
            return todoLoad(state, action.todos)
        case C.TODO_TOGGLE_COMPLETE:
            return toggleComplete(state, action.todo)
        case C.TODO_UPDATE:
            return todoUpdate(state, action.todo)
        case C.TODO_TOGGLE_ACTIVE:
            return toggleActive(state, action.todo)
        default:
            return state
    }
}

const todoAddTag = (state, tag) => {
    if (!state.activeTodo)
        return state
    const indexFromState = state.todos.findIndex(t => t.id === state.activeTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        const tags = todo.tags
        const newTags = tags.push(tag)
        state = state.set('todos', state.todos.set(indexFromState, todo.set('tags', newTags)))
        state = state.set('activeTodo', state.todos.get(indexFromState))
    }
    return state
}

const todoRemoveTag = (state, tag) => {
    if (!state.activeTodo)
        return state
    const indexFromState = state.todos.findIndex(t => t.id === state.activeTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        const tags = todo.tags
        const tagIdx = tags.findIndex(t => t.text === tag.text)
        if (tagIdx >= 0) {
            const newTags = tags.delete(tagIdx)
            state = state.set('todos', state.todos.set(indexFromState, todo.set('tags', newTags)))
            state = state.set('activeTodo', state.todos.get(indexFromState))
        } 
    }
    return state
}

function todoTagReducer(state, action) {
    switch (action.type) {
        case C.TODO_ADD_TAG:
            return todoAddTag(state, action.tag)
        case C.TODO_REMOVE_TAG:
            return todoRemoveTag(state, action.tag)
        default:
            return state
    }
}

const todoToggleShowAll = (state) => {
    state = state.set('showAll', !state.showAll)
    return state
}

function todoVisibilityReducer(state, action) {
    switch (action.type) {
        case C.TODO_TOGGLE_SHOWALL:
            return todoToggleShowAll(state)
        default:
            return state
    }
}

const chainReducers = function(...reducers) {
    return (state = TodoState(), action) => {
        let newState = state
        for (var key in reducers) {
            let r = reducers[key]
            newState = r(newState, action)
        }
        return newState
    }
}

export default chainReducers(
   todoListReducer,
   todoTagReducer,
   todoVisibilityReducer
)