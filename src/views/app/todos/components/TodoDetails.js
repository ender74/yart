import React, { Component } from 'react'
import {reduxForm} from 'redux-form'

import { ButtonToolbar, Button } from 'react-bootstrap'

import ValidatedInput from '../../components/ValidatedInput'
import DateTimeInput, { isValidDate, parseISODate, formatISODate, parseDate, formatDate } from '../../components/DateTimeInput'

const todoDetailsForm = { 
  form: 'todoDetails',                           
  fields: ['text', 'url', 'due', 'location'],
  touchOnChange: true,
  validate(todo) {
      var errors = {}
      if (!todo.text) errors.text = 'Bitte geben Sie einen Text ein.'
      if (todo.due) {
          const date = parseDate(todo.due)
          if (!date.isValid()) errors.due = todo.due + ' ist kein gültiges Datum.'
      }
      return errors
  }
}

class TodoDetails extends Component {
    render() {
        const onSubmit = (values) => this.props.onUpdate(this.props.todo, values)
        const {fields: {text, url, due, location}, handleSubmit} = this.props
        return <aside style={ this.props.style }>
            <div>
                <ValidatedInput
                    type = 'text'
                    {...text} />
                <ValidatedInput
                    type = 'text'
                    placeholder='http://www.log84.de'
                    {...url} />
                <DateTimeInput
                    type = 'text'
                    placeholder='17.03.2016'
                    {...due} />
                <ValidatedInput
                    type = 'text'
                    {...location} />
                <ButtonToolbar>
                    <Button bsStyle='primary' tooltip='Fenster schließen' onClick={ () => this.props.onClose( this.props.todo ) }>Schließen</Button>
                    <Button bsStyle='success' tooltip='Änderungen speichern' onClick={ handleSubmit(onSubmit) }>Aktualisieren</Button>
                </ButtonToolbar>
            </div>
        </aside>
    }
}

function stateToValues(todo) {
    if (!todo)
        return todo
    var ret = Object.assign({}, todo.toObject())
    if (ret.due) 
        ret.due = formatDate(parseISODate(ret.due))
    return ret
}

export function valuesToState(todo) {
    if (!todo)
        return todo
    var ret = Object.assign({}, todo)
    if (ret.due) 
        ret.due = formatISODate(parseDate(ret.due))
    return ret
}

const TodoDetailsForm = reduxForm(todoDetailsForm,
state => ({ 
  initialValues: stateToValues(state.todos.activeTodo)
}),
{})(TodoDetails)

export default TodoDetailsForm