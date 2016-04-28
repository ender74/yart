import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import { Form, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'
import { FormField, DateField } from 'redux-form-fields'
import { FormattedMessage } from 'react-intl'

import Tags from './Tags'

const todoDetailsForm = {
    form: 'todoDetails',
    fields: ['text', 'url', 'due', 'location'],
    touchOnChange: true,
    validate(todo) {
        var errors = {}
        if (!todo.text)
            errors.text = (
                <FormattedMessage
                    id='todo.missing_text'
                    defaultMessage='please insert todo text'
                />
            )
        if (todo.due && !DateField.isValid(todo.due))
            errors.due = (
                <FormattedMessage
                    id='todo.illegal_date'
                    defaultMessage={'The text {date} is no valid date.'}
                    values={{date: todo.due}}
                />
            )
        return errors
    }
}

const glyphiconBack = <Glyphicon glyph='backward' />

class TodoDetails extends Component {
    render() {
        const onSubmit = (values) => this.props.onUpdate(this.props.todo, values)
        const {fields: {text, url, due, location}, tags, onAddTag, handleSubmit} = this.props
        return (
            <form>
                <FormField
                    {...text} />
                <FormField
                    placeholder='http://www.log84.de'
                    {...url} />
                <DateField
                    placeholder='17.03.2016'
                    {...due} />
                <FormField
                    placeholder='Panoramastraße 1A, 10178 Berlin'
                    {...location} />
                <ButtonToolbar>
                    <Button bsStyle='primary' onClick={ () => this.props.onClose( this.props.todo ) }>
                        {glyphiconBack}
                        <FormattedMessage
                            id='todo.close'
                            defaultMessage='Back'
                        />
                    </Button>
                    <Button bsStyle='success' onClick={ handleSubmit(onSubmit) }>
                        <FormattedMessage
                            id='todo.save'
                            defaultMessage='Save'
                        />
                    </Button>
                </ButtonToolbar>
                <Tags tags = { tags } onAddTag = { onAddTag } />
            </form>
        )
    }
}

function stateToValues(todo) {
    if (!todo)
        return todo
    var ret = Object.assign({}, todo.toObject())
    if (ret.due)
        ret.due = DateField.format(ret.due)
    return ret
}

export function valuesToState(todo) {
    if (!todo)
        return todo
    var ret = Object.assign({}, todo)
    if (ret.due)
        ret.due = DateField.parse(ret.due)
    return ret
}
const TodoDetailsForm = reduxForm(todoDetailsForm,
state => ({ 
  initialValues: stateToValues(state.todos.activeTodo)
}),
{})(TodoDetails)

export default TodoDetailsForm