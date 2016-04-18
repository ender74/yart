import React, { Component } from 'react'
import { Grid, Jumbotron, Button, Glyphicon } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

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
                    <p>
                        <FormattedMessage
                            id='jumbotron.slogan'
                            defaultMessage='Organize your life.'
                        />
                    </p>
                    <p>
                        <Button bsStyle="primary" onClick={ () => this.setState({showRegister: true}) }>
                            <FormattedMessage
                                id='login.register'
                                defaultMessage='Register new account'
                            />
                        </Button>
                    </p>
                    <p>
                        <Button bsStyle="success" onClick={ () => this.setState({showLogin: true}) }>
                            <Glyphicon glyph='log-in' /> &nbsp;
                            <FormattedMessage
                                id='login.login'
                                defaultMessage='Login for existing users'
                            />
                        </Button>
                    </p>
                </Jumbotron>
                <LoginModal show={ this.state.showLogin } hide={ () => this.setState({showLogin: false}) } onUpLogin={ this.props.onUpLogin }/>
                <RegisterModal show={ this.state.showRegister } hide={ () => this.setState({showRegister: false}) } onSignUp={ this.props.onSignUp }/>
            </Grid>
        )
    }
}

export default LoginView