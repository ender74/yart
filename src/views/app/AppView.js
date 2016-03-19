import React, { Component } from 'react'
import Radium from 'radium'

import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import watch from 'redux-watch'

import BoundApp from './BoundApp'
import BoundTodosView from './todos/BoundTodosView'
import BoundLoginView from './login/BoundLoginView'

import store from './store'

function loggedIn(state) {
    return state.auth.user
}

function requireAuth(nextState, replace) {
  if (!loggedIn(store.getState())) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class AppView extends Component {
    constructor() {
        super()

        let w = watch(store.getState, 'auth.user')
        store.subscribe(w((newVal, oldVal, objectPath) => {
            if (newVal)
                browserHistory.push('/app')
            else
                browserHistory.push('/login')
        }))
    }

    render() {
        return <Provider store={store}>
            <Router history={ browserHistory }>
                <Route path='login' component= { BoundLoginView } />
                <Route path='/' component = { BoundApp } onEnter = { requireAuth } >
                    <Route path='app' component= { BoundTodosView } />
                </Route>
            </Router>
        </Provider>
    }
}

export default AppView
