import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'
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
      const date = parseDate(todo.due)
      if (!date || !date.isValid()) errors.due = todo.due + ' ist kein gültiges Datum.'
      return errors
  }
}

class TodoDetails extends Component {
    render() {
        const {fields: {text, url, due, location}, handleSubmit} = this.props
        return <aside style={ this.props.style }>
            <div style={ styles.editTodoArea }>
                <Input
                    type = 'text'
                    style={ styles.editText }
                    {...text} />
                <Input
                    type = 'text'
                    style={ styles.editText }
                    placeholder='http://www.log84.de'
                    {...url} />
                <DateTimeInput
                    type = 'text'
                    style={ styles.editText }
                    placeholder='17.03.2016'
                    {...due} />
                <Input
                    type = 'text'
                    style={ styles.editText }
                    {...location} />
                <ButtonBar style= { styles.buttonBar }>
                    <Button tooltip='Fenster schließen' onClick={ () => this.props.onClose( this.props.todo ) } text='X' />
                    <Button tooltip='Änderungen speichern' onClick={ handleSubmit } text='U' />
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
        padding: '10px 10px 10px 10px',
        margin: '10px 10px 10px 10px'
    },
    
    buttonBar: {
        float: 'right'
    },
    
    editTodoArea: {
        background: 'rgba(255,255,255,0.3)',
        display: 'flex',
        flexDirection: 'column'
    }
}

function stateToValues(todo) {
    if (!todo)
        return todo
    var ret = Object.assign({}, todo)
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
{})(Radium(TodoDetails))

export default TodoDetailsForm