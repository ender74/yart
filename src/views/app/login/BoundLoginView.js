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
        onLogin: (user, accessToken) => dispatch(AuthActions.loginSucceeded(user, accessToken))
    }
}

const BoundLoginView = connect(mapStateToPropsTodos, mapDispatchToProps)(LoginView)

export default BoundLoginView