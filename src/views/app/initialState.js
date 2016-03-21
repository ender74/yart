import Immutable from 'immutable'

let state = {
    todos: {
        todos: [],
        activeTodo: null,
        showAll: false
    }
}

export default function initialState() {
    return state
}