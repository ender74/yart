import Immutable from 'immutable'

import C from './TodosConstants'
import { Todo, TodoRef, TodoList, TodoState, TodoDisplayState, TagRef } from './Types'

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
    if (indexFromState >= 0) {
        state = state.set('todos', state.todos.delete(indexFromState))
    }
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

function todoListReducer(state = TodoState(), action) {
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
        default:
            return state
    }
}

const todoAddTag = (state, activeTodo, tag) => {
    if (!activeTodo)
        return state
    const indexFromState = state.todos.findIndex(t => t.id === activeTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        const tags = todo.tags
        const tagIdx = tags.findIndex(t => t.text === tag.text)
        if (tagIdx < 0) {
            const newTags = tags.push(new TagRef({
                id: tag.id,
                text: tag.text
            }))
            state = state.set('todos', state.todos.set(indexFromState, todo.set('tags', newTags)))
        }
    }
    return state
}

const todoRemoveTag = (state, activeTodo, tag) => {
    if (!activeTodo)
        return state
    const indexFromState = state.todos.findIndex(t => t.id === activeTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        const tags = todo.tags
        const tagIdx = tags.findIndex(t => t.text === tag.text)
        if (tagIdx >= 0) {
            const newTags = tags.delete(tagIdx)
            state = state.set('todos', state.todos.set(indexFromState, todo.set('tags', newTags)))
        }
    }
    return state
}

function todoTagReducer(state = TodoState(), action) {
    switch (action.type) {
        case C.TODO_ADD_TAG:
            return todoAddTag(state, action.todo, action.tag)
        case C.TODO_REMOVE_TAG:
            return todoRemoveTag(state, action.todo, action.tag)
        default:
            return state
    }
}

const todoSetActiveFilter = (state, filter) => {
    state = state.set('activeFilter', filter)
    return state
}

const toggleActive = (state, todo) => {
    if (state.activeTodo && state.activeTodo.id === todo.id)
        state = state.remove('activeTodo')
    else
        state = state.set('activeTodo', new TodoRef({id: todo.id}))
    return state
}

const todoDestroyActive = (state, todo) => {
    if (state.activeTodo && state.activeTodo.id === todo.id)
        state = state.remove('activeTodo')
    return state
}

export function todosDisplayReducer(state = TodoDisplayState(), action) {
    switch (action.type) {
        case C.TODO_SET_FILTER:
            return todoSetActiveFilter(state, action.filter)
        case C.TODO_TOGGLE_ACTIVE:
            return toggleActive(state, action.todo)
         case C.TODO_DESTROY:
             return todoDestroyActive(state, action.todo)
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
   todoTagReducer
)