import React, { Component } from 'react'
import Radium from 'radium'

import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import watch from 'redux-watch'

import BoundApp from './BoundApp'
import BoundTodosView from './todos/BoundTodosView'
import BoundLoginView from './login/BoundLoginView'

import store from './store'

class AppView extends Component {
    constructor() {
        super()
        
        let w = watch(store.getState, 'auth.user')
        store.subscribe(w((newVal, oldVal, objectPath) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            if (newVal)
                browserHistory.push('/app')
            else
                browserHistory.push('/')
        }))        
    }
    
    render() {
        return <Provider store={store}> 
            <Router history={ browserHistory }>
                <Route path='/' component= { BoundApp } >
                    <Route path='login' component= { BoundLoginView } />
                    <Route path='app' component= { BoundTodosView } />
                </Route>
            </Router>
        </Provider>
    }
}

export default AppView