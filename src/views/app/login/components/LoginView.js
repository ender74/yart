import React, { Component } from 'react'
import { Grid, Jumbotron, Button, Glyphicon } from 'react-bootstrap'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

class LoginView extends Component {
    constructor() {
        super()
        this.state={}
    }

    render() {
        return (
            <Grid>
                <Jumbotron>
                    <h1>Log84.de</h1>
                    <p>Organisiere Deine Ideen.</p>
                    <p><Button bsStyle="primary" onClick={ () => this.setState({showRegister: true}) }>Registrieren</Button></p>
                    <p><Button bsStyle="success" onClick={ () => this.setState({showLogin: true}) }><Glyphicon glyph='log-in' /> Anmelden</Button></p>
                </Jumbotron>
                <LoginModal show={ this.state.showLogin } hide={ () => this.setState({showLogin: false}) } onUpLogin={ this.props.onUpLogin }/>
                <RegisterModal show={ this.state.showRegister } hide={ () => this.setState({showRegister: false}) } onSignUp={ this.props.onSignUp }/>
            </Grid>
        )
    }
}

export default LoginView