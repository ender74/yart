import React, { Component } from 'react'
import Radium from 'radium'
import $ from 'jquery'

class LoginView extends Component {
    constructor() {
        super()
        this.state={
            user: '', 
            password: ''
        }
        this.onSignIn = this.onSignIn.bind(this)
    }
    
    onSignIn(googleUser) {
        console.log(googleUser)
        this.props.history.push('/app')
    }
    
    componentDidMount() {
        $.getScript('https://apis.google.com/js/platform.js')
            .done(() => {
                gapi.signin2.render('my-signin2', {
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'width': 200,
                'height': 50,
                'longtitle': true,
                'theme': 'light',
                'onsuccess': this.onSignIn
                })
            })        
    }
    
    render() {
        return <form style={ styles.login } role='form'>
        <div style={ styles.user }>
          <input type='text' placeholder='Benutzername' />
          <input type='password' placeholder='Passwort' />
        </div>
        <button type='submit' onClick={this.login.bind(this)}>Anmelden</button>
        <div id="my-signin2"></div>
      </form>
    }
    
    login() {
        //this.props.history.push('/app')        
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