import React, { Component } from 'react'
import Radium from 'radium'
import $ from 'jquery'
import Parse from 'node-parse-api'

import UsernamePassword from './UsernamePassword'
import Register from './Register'

class LoginView extends Component {
    constructor() {
        super()
        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn(googleUser) {
        const user = {
            name: googleUser.getBasicProfile().getName(),
            email: googleUser.getBasicProfile().getEmail()
        }
        const accessToken = googleUser.getAuthResponse().access_token
        this.props.onLogin(user, accessToken)
    }

    componentDidMount() {
//        $.getScript('https://apis.google.com/js/platform.js')
//            .done(() => {
//                gapi.signin2.render('my-signin2', {
//                'scope': 'https://www.googleapis.com/auth/plus.login',
//                'width': 200,
//                'height': 50,
//                'longtitle': true,
//                'theme': 'light',
//                'onsuccess': this.onSignIn
//                })
//            })
//           .fail(
//		(xhr,settings,error) => {window.alert('Google API nicht geladen. Haben Sie AdBlockPlus installiert?')}
//	    )
    }
    
    render() {
        return <div styles={ styles.login }>
            <UsernamePassword onSubmit={ this.props.onUpLogin } />
            <center>--- Oder ---</center>
            <Register onSubmit={ this.props.onSignUp } />
        </div>
    }
}

const styles = {
    login: {
        width: '30%',
        paddingLeft: '35%',
        paddingRight: '35%'
    },
    user: {
        display: 'flex',
        flexDirection: 'column'
    }
}

export default Radium(LoginView)
