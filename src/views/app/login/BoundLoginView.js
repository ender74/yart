import React, { Component } from 'react'
import {connect} from 'react-redux'

import AuthActions from './actions/AuthActions'
import LoginView from './components/LoginView'

function mapStateToPropsTodos(state) {
    return {
        user: state.auth.user
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        onLogin: (user) => dispatch(AuthActions.loginSucceeded(user)),
        onSignUp: (user) => dispatch(AuthActions.signUp(user.username, user.password, user.email)),
        onUpLogin: (user) => dispatch(AuthActions.loginBasic(user.username, user.password))
    }
}

const BoundLoginView = connect(mapStateToPropsTodos, mapDispatchToProps)(LoginView)

export default BoundLoginView