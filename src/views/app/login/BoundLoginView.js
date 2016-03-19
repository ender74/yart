import React, { Component } from 'react'
import {connect} from 'react-redux'

import AuthActions from './actions/AuthActions'
import LoginView from './components/LoginView'
import { signUp, login } from './AuthFunctions.js'

function mapStateToPropsTodos(state) {
    return {
        user: state.auth.user
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        onLogin: (user) => dispatch(AuthActions.loginSucceeded(user)),
        onSignUp: (user) => signUp(user.username, user.password, user.email, 
                                (user) => dispatch(AuthActions.loginSucceeded(user)),
                                (user, error) => dispatch(AuthActions.signUpFailed(user, error.code, error.message))
                            ),
        onUpLogin: (user) => login(user.username, user.password, 
                                (user) => dispatch(AuthActions.loginSucceeded(user)),
                                (user, error) => dispatch(AuthActions.signUpFailed(user, error.code, error.message))
                            )
    }
}

const BoundLoginView = connect(mapStateToPropsTodos, mapDispatchToProps)(LoginView)

export default BoundLoginView