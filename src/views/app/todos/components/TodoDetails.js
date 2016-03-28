import React, { Component } from 'react'
import {reduxForm} from 'redux-form'

import Input from '../../components/Input'
import DateTimeInput, { isValidDate, parseISODate, formatISODate, parseDate, formatDate } from '../../components/DateTimeInput'
import ButtonBar from '../../components/ButtonBar'
import Button from '../../components/Button'

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
                <Input
                    type = 'text'
                    {...text} />
                <Input
                    type = 'text'
                    placeholder='http://www.log84.de'
                    {...url} />
                <DateTimeInput
                    type = 'text'
                    placeholder='17.03.2016'
                    {...due} />
                <Input
                    type = 'text'
                    {...location} />
                <ButtonBar>
                    <Button tooltip='Fenster schließen' onClick={ () => this.props.onClose( this.props.todo ) } text='X' />
                    <Button tooltip='Änderungen speichern' onClick={ handleSubmit(onSubmit) } text='U' />
                </ButtonBar>
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