import Immutable from 'immutable'

let state = {
    todos: {
        todos: Immutable.List(),
        showAll: false
    }
}

export default function initialState() {
    return state
}