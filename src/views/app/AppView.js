import React, { Component } from 'react'
import Radium from 'radium'

import { Router, Route, browserHistory } from 'react-router'
import { Provider, update } from 'react-intl-redux'
import moment from 'moment'
import watch from 'redux-watch'
import $ from 'jquery'

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
            console.log('intl.locale changed to ' + newVal)
            moment.locale(newVal)
        }))
    }

    componentDidMount() {
        const appViewThis = this
        const locale = detectLocale()
        $.getJSON( "messages_" + locale + ".json" )
          .done(function( messages ) {
                store.dispatch(
                    update(
                        {
                            locale,
                            messages
                        }
                    )
                )
          })
          .fail(function( jqxhr, textStatus, error ) {
              $.getJSON( "messages.json" )
                .done(function( messages ) {
                store.dispatch(
                    update(
                        {
                            locale,
                            messages
                        }
                    )
                )
                })
        })
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
