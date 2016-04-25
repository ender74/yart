import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { intlReducer } from 'react-intl-redux'

import todosReducer from './todos/actions/TodosReducer'
import tagsReducer from './todos/actions/TagsReducer'
import authReducer from './login/actions/AuthReducer'

const rootReducer = combineReducers({
    todos: todosReducer,
    tags: tagsReducer,
    auth: authReducer,
    form: formReducer,
    intl: intlReducer
})

function simpleLogger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', JSON.stringify(action))

    let returnValue = next(action)

    console.log('state after dispatch', JSON.stringify(getState()))

    return returnValue
  }
}

const store = applyMiddleware(thunk)(createStore)(rootReducer)

export default store