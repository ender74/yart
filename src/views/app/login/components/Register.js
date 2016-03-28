import React, { Component } from 'react'
import {reduxForm} from 'redux-form'

import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'

import ValidatedInput from '../../components/ValidatedInput'
import DateTimeInput, { isValidDate, parseISODate, formatISODate, parseDate, formatDate } from '../../components/DateTimeInput'

const registerForm = { 
  form: 'register',                           
  fields: ['username', 'password'],
  touchOnChange: true,
  validate(login) {
      var errors = {}
      if (!login.username) errors.username = 'Bitte geben Sie ihre email Adresse ein.'
      if (!login.password) errors.password = 'Bitte geben Sie ihr Passwort ein.'
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
                <ValidatedInput
                    type = 'text'
                    label = 'Email Adresse:'
                    {...username}
                    addonBefore={ glyphiconUser } />
                <ValidatedInput
                    type = 'password'
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