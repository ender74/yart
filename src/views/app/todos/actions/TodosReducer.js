import Immutable from 'immutable'

import C from './TodosConstants'
import { Todo, TodoRef, TodoList, TodoState, TodoDisplayState, DefaultTodoDisplayState, TagRef, Filter, FilterProps, FilterList } from './Types'

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
    todos.forEach(todo => {
        state = addTodo(state, new Todo(todo))
    })
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

export function todosReducer(state, action) {
    if (typeof state === 'undefined')
        state = TodoState()
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
        case C.TODO_ADD_TAG:
            return todoAddTag(state, action.todo, action.tag)
        case C.TODO_REMOVE_TAG:
            return todoRemoveTag(state, action.todo, action.tag)
        default:
            return state
    }
}

const todoAddFilter = (state, filter) => {
    if (!state.activeFilters)
        state = state.set('activeFilters', new FilterList([]))
    const index = state.activeFilters.findIndex(t => t.name === filter)
    if (index < 0) {
        const groupMask = FilterProps.getByName(filter).groupMask
        let activeFilters = state.activeFilters
        activeFilters = activeFilters.filter(t => {
            const g = FilterProps.getByName(t.name).groupMask
            return (groupMask & g) == 0
        })
        activeFilters = activeFilters.push(Filter({ name: filter }))
        state = state.set('activeFilters', activeFilters)
    }
    return state
}

const todoRemoveFilter = (state, filter) => {
    if (!state.activeFilters)
        state = state.set('activeFilters', new FilterList([]))
    const index = state.activeFilters.findIndex(t => t.name === filter)
    if (index >= 0) {
        state = state.set('activeFilters', state.activeFilters.delete(index))
    }
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

export function todosDisplayReducer(state, action) {
    if (typeof state === 'undefined')
        state = DefaultTodoDisplayState
    switch (action.type) {
        case C.TODO_ADD_FILTER:
            return todoAddFilter(state, action.filter)
        case C.TODO_REMOVE_FILTER:
            return todoRemoveFilter(state, action.filter)
        case C.TODO_TOGGLE_ACTIVE:
            return toggleActive(state, action.todo)
         case C.TODO_DESTROY:
             return todoDestroyActive(state, action.todo)
       default:
            return state
    }
}