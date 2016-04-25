import Immutable from 'immutable'
import C from './TodosConstants'
import { Todo, TodoList, TodoState } from './Types'

function addTodo(state, newTodo) {
    return state.set("todos", state.todos.push(newTodo))
}

function todoAddNew(state, todo) {
    const newTodo = new Todo(todo)
    state = addTodo(state, newTodo)
    return state
}

function todoLoad(state, todos) {
    state = state.set("todos", new TodoList())
    for (var key in todos)
        state = addTodo(state, new Todo(todos[key]))
    return state
}

function todoDestroy(state, todo) {
    const indexFromState = state.todos.findIndex(t => t.id === todo.id)
    if (indexFromState >= 0)
        state = state.set("todos", state.todos.delete(indexFromState))
    return state
}

function todoUpdate(state, newTodo) {
    const indexFromState = state.todos.findIndex(t => t.id === newTodo.id)
    if (indexFromState >= 0) {
        const todo = state.todos.get(indexFromState)
        state = state.set("todos", state.todos.set(indexFromState, todo.merge(newTodo)))
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

function todosReducer(state = TodoState(), action){
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
        case C.TODO_TOGGLE_SHOWALL:
            return todoToggleShowAll(state)
        default:
            return state;
    }
}

export default todosReducer