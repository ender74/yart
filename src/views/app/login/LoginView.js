import React, { Component } from 'react'
import Radium from 'radium'

class LoginView extends Component {
    constructor() {
        super()
        this.state={
            user: '', 
            password: ''
        }
    }
    
    render() {
        return <form style={ styles.login } role='form'>
        <div style={ styles.user }>
          <input type='text' placeholder='Benutzername' />
          <input type='password' placeholder='Passwort' />
        </div>
        <button type='submit' onClick={this.login.bind(this)}>Anmelden</button>
      </form>
    }
    
    login() {
        this.props.history.push('/app')        
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