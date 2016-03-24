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

function simpleLogger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', JSON.stringify(action))

    let returnValue = next(action)

    console.log('state after dispatch', JSON.stringify(getState()))

    return returnValue
  }
}

const store = applyMiddleware(thunk, simpleLogger)(createStore)(rootReducer,initialState())

export default store