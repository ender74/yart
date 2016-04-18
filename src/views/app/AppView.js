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

class AppView extends Component {
    constructor() {
        super()

        this.state = {
            locale: 'en',
            messages: {}
        }

        let w = watch(store.getState, 'auth.user')
        store.subscribe(w((newVal, oldVal, objectPath) => {
            console.log('auth.user changed')
            if (newVal)
                browserHistory.push('/app')
            else
                browserHistory.push('/login')
        }))
    }

    componentDidMount() {
        const appViewThis = this
        const locale = window.navigator.userLanguage || window.navigator.language
        $.getJSON( "messages_" + locale + ".json" )
          .done(function( json ) {
            appViewThis.setState({
                locale: locale,
                messages: json
            })
          })
          .fail(function( jqxhr, textStatus, error ) {
              $.getJSON( "messages.json" )
                .done(function( json ) {
                    appViewThis.setState({
                        locale: 'en',
                        messages: json
                    })
                })
        })
    }

    render() {
        moment.locale(this.state.locale)
        return (
            <Provider store={ store } locale={ this.state.locale } messages={ this.state.messages }>
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
