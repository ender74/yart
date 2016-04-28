import React, { Component } from 'react'

import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-intl-redux'
import moment from 'moment'
import watch from 'redux-watch'

import LocaleActions from './actions/LocaleActions'
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

function detectLocale() {
    var lang = window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.language
    if (lang.indexOf('-') !== -1)
        lang = lang.split('-')[0]

    if (lang.indexOf('_') !== -1)
        lang = lang.split('_')[0]

    return lang
}

class AppView extends Component {
    constructor() {
        super()

        let wUser = watch(store.getState, 'auth.user')
        store.subscribe(wUser((newVal, oldVal, objectPath) => {
            console.log('auth.user changed')
            if (newVal)
                browserHistory.push('/app')
            else
                browserHistory.push('/login')
        }))

        let wLocale = watch(store.getState, 'intl.locale')
        store.subscribe(wLocale((newVal, oldVal, objectPath) => {
            moment.locale(newVal)
        }))
    }

    componentDidMount() {
        const appViewThis = this
        const locale = detectLocale()
        store.dispatch(LocaleActions.setLocale(locale))
    }

    render() {
        return (
            <Provider store={ store }>
                <Router history={ browserHistory }>
                    <Route component = { BoundApp }>
                        <Route path='login' component= { BoundLoginView } />
                        <Route path='/' onEnter = { requireAuth } >
                            <Route path='app' component= { BoundTodosView } />
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

export default AppView
