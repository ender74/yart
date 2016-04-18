import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import { FormField } from 'redux-form-fields'
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const registerForm = {
  form: 'register',                           
  fields: ['username', 'password'],
  touchOnChange: true,
  validate(login) {
      var errors = {}
        var errors = {}
        if (!login.username)
            errors.username = (
                <FormattedMessage
                    id='login.missing_username'
                    defaultMessage='please input your email'
                />
            )
        if (!login.password)
            errors.password = (
                <FormattedMessage
                    id='login.missing_password'
                    defaultMessage='please input your password'
                />
            )
        return errors
      return errors
  }
}

class Register extends Component {
    render() {
        const glyphiconUser = <Glyphicon glyph='user' />
        const glyphiconLock = <Glyphicon glyph='lock' />
        const {fields: {username, password}, handleSubmit} = this.props
        return (
            <form>
                <FormField
                    label = 'Email Adresse:'
                    {...username}
                    addonBefore={ glyphiconUser } />
                <FormField
                    label = 'Neues Passwort:'
                    {...password}
                    addonBefore={ glyphiconLock }/>
                <ButtonToolbar>
                    <Button bsStyle='primary' tooltip='Registrieren' onClick={ handleSubmit }>Registrieren</Button>
                </ButtonToolbar>
            </form>
        )
    }
}

function stateToValues(state) {
    return {}
}

export function valuesToState(values) {
    return {
        username: values.username,
        password: values.password,
        email: values.username
    }
}

const RegisterForm = reduxForm(registerForm,
state => ({ 
  initialValues: stateToValues(state)
}),
{})(Register)

export default RegisterForm