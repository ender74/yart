import Uuid from 'uuid-lib'
import C from './todosConstants'
import initialState from '../../initialState'

function todoAddNew(state, text) {
    const newTodo = {
        id: Uuid.raw(),
        text: text,
        complete: false
    }
    state.todos.push(newTodo)
    return state
}

function todoDestroy(state, todo) {
    const todoFromState = state.todos.find(t => t.id === todo.id)
    if (todoFromState)
        state.todos.splice(state.todos.indexOf(todoFromState), 1)
    return state
}

function todoUpdateProp(state, todo, prop, text) {
    const todoFromState = state.todos.find(t => t.id === todo.id)
    if (todoFromState)
        todoFromState[prop] = text
    return state
}

function todoUpdateActive(state, props) {
    const todoFromState = state.todos.find(t => t.id === state.activeTodo.id)
    if (todoFromState) 
        for (var key in props) 
            todoFromState[key] = props[key]    
        
    return state
}

function toggleComplete(state, todo) {
    const todoFromState = state.todos.find(t => t.id === todo.id)
    if (todoFromState)
        todoFromState.complete = !todoFromState.complete
    return state    
}

function toggleActive(state, todo) {
    if (state.activeTodo && state.activeTodo.id == todo.id)
        state.activeTodo = null
    else
        state.activeTodo = state.todos.find(t => t.id === todo.id)
    return state
}

function todoToggleShowAll(state) {
    state.showAll = !state.showAll
    return state
}

function todosReducer(state,action){
    console.log(action)
    console.log(state)
    state = state ? JSON.parse(JSON.stringify(state)) : initialState()  //quick deep copy
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
    console.log(state)
    return state
}

export default todosReducer