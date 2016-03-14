import React, { Component } from 'react'
import Radium from 'radium'
import $ from 'jquery'

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
        console.log('componentDidMount')
        $.getScript('https://apis.google.com/js/platform.js')
            .done(() => {
                gapi.signin2.render('my-signin2', {
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'width': 400,
                'height': 100,
                'longtitle': true,
                'theme': 'light',
                'onsuccess': this.onSignIn
                })
            })
    }

    render() {
        return <form style={ styles.login } role='form'>
        <div id="my-signin2"></div>
      </form>
    }
}

const styles = {
    login: {
        'width': '30%',
        'paddingLeft': '35%',
        'paddingRight': '35%'
    },
    user: {
        'display': 'flex',
        'flexDirection': 'column'
    }
}

export default Radium(LoginView)
