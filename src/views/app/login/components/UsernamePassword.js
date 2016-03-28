import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import { Input, ButtonInput, Glyphicon } from 'react-bootstrap'

const usernamePasswordForm = {
  form: 'usernamePassword',                           
  fields: ['username', 'password'],
  touchOnChange: true,
  validate(login) {
      var errors = {}
      if (!login.username) errors.username = 'Bitte geben Sie ihren Benutzernamen ein.'
      if (!login.password) errors.password = 'Bitte geben Sie ihr Passwort ein.'
      return errors
  }
}

const glyphiconUser = <Glyphicon glyph='user' />
const glyphiconLock = <Glyphicon glyph='lock' />

class UsernamePassword extends Component {
    render() {
        const {fields: {username, password}, handleSubmit} = this.props
        return (
            <form>
                <Input
                    type = 'text'
                    {...username} addonBefore={ glyphiconUser } />
                <Input
                    type = 'password'
                    {...password}  addonBefore={ glyphiconLock } />
                <ButtonInput bsStyle='success' type='submit' value='Anmelden' onClick={ handleSubmit } />
            </form>
        )
    }
}

function stateToValues(state) {
    return {}
}

export function valuesToState(values) {
    return values
}

const UsernamePasswordForm = reduxForm(usernamePasswordForm,
state => ({ 
  initialValues: stateToValues(state)
}),
{})(UsernamePassword)

export default UsernamePasswordForm