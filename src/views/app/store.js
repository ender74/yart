import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

import initialState from './initialState'
import todosReducer from './todos/actions/todosReducer'

const rootReducer = combineReducers({
    todos: todosReducer,
    form: formReducer
})

export default applyMiddleware(thunk)(createStore)(rootReducer,initialState())