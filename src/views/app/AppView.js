import React, { Component } from 'react'
import Radium from 'radium'

import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import App from './components/App'
import BoundTodosView from './todos/BoundTodosView'
import LoginView from './login/LoginView'

import store from './store'

class AppView extends Component {
    render() {
        return <Provider store={store}> 
            <Router history={ browserHistory }>
                <Route path='/' component= { App } >
                    <Route path='login' component= { LoginView } />
                    <Route path='app' component= { BoundTodosView } />
                </Route>
            </Router>
        </Provider>
    }
}

export default AppView