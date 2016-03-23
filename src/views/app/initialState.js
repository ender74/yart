import Immutable from 'immutable'
import { TodoState } from './Types'

let state = {
    todos: TodoState()
}

export default function initialState() {
    return state
}