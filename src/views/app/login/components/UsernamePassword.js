import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'
import {reduxForm} from 'redux-form'

import Label from '../../components/Label'
import Input from '../../components/Input'
import DateTimeInput, { isValidDate, parseISODate, formatISODate, parseDate, formatDate } from '../../components/DateTimeInput'
import ButtonBar from '../../components/ButtonBar'
import Button from '../../components/Button'

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

class UsernamePassword extends Component {
    render() {
        const {fields: {username, password}, handleSubmit} = this.props
        return <aside style={ this.props.style }>
            <div style={ styles.form }>
                <Label text="Benutzername: " />
                <Input
                    type = 'text'
                    style={ styles.editText }
                    {...username} />
                <Label text="Passwort: " />
                <Input
                    type = 'password'
                    style={ styles.editText }
                    {...password} />
                <ButtonBar style= { styles.buttonBar }>
                    <Button tooltip='Anmelden' onClick={ handleSubmit } text='Anmelden' />
                </ButtonBar>
            </div>
        </aside>
    }
}

var styles = {    
    editText: {
        background: 'rgba(255,255,255,0.7)',
        border: 'none',
        borderRadius: '10px',
        padding: '5px 5px 5px 5px',
        margin: '5px 5px 5px 5px'
    },
    
    form: {
        background: 'rgba(255,255,255,0.3)',
        margin: '10px 30% 10px 30%',
        padding: '10px 10px 10px 10px',
        width: '40%',
        display: 'flex',
        flexDirection: 'column'
    },
    
    buttonBar: {
        float: 'right'
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
{})(Radium(UsernamePassword))

export default UsernamePasswordForm