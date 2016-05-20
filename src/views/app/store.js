import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { intlReducer } from 'react-intl-redux'

import todosReducer, { todosDisplayReducer } from './todos/actions/TodosReducer'
import tagsReducer from './todos/actions/TagsReducer'
import authReducer from './login/actions/AuthReducer'

const rootReducer = combineReducers({
    todos: todosReducer,
    todosDisplay: todosDisplayReducer,
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

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const store = compose(applyMiddleware(thunk), devTools)(createStore)(rootReducer)

export default store