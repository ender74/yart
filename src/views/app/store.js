import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

import initialState from './initialState'
import todosReducer from './todos/actions/TodosReducer'
import authReducer from './login/actions/AuthReducer'

const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer,
    form: formReducer
})

export default applyMiddleware(thunk)(createStore)(rootReducer,initialState())