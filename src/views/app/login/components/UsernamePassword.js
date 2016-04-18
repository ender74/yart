import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import { FormField } from 'redux-form-fields'
import { Input, Button, Glyphicon } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const usernamePasswordForm = {
    form: 'usernamePassword',
    fields: ['username', 'password'],
    touchOnChange: true,
    validate(login) {
        var errors = {}
        if (!login.username)
            errors.username = (
                <FormattedMessage
                    id='login.missing_username'
                    defaultMessage='please input your username'
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
    }
}

const glyphiconUser = <Glyphicon glyph='user' />
const glyphiconLock = <Glyphicon glyph='lock' />

class UsernamePassword extends Component {
    render() {
        const {fields: {username, password}, handleSubmit} = this.props
        return (
            <form>
                <FormField
                    {...username} addonBefore={ glyphiconUser } />
                <FormField
                    type = 'password'
                    {...password}  addonBefore={ glyphiconLock } />
                <Button bsStyle='success' type='submit' onClick={ handleSubmit }>
                    <FormattedMessage
                        id='login.login'
                        defaultMessage='Login'
                    />
                </Button>
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