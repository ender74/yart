import React, { Component } from 'react'
import { Input } from 'react-bootstrap'
import ErrorDecorator from './ErrorDecorator'

class ValidatedInput extends Component {
    render() {
        const { error, touched } = this.props
        return <ErrorDecorator error={ error } touched={ touched }><Input {...this.props} /></ErrorDecorator>
    }
}

export default ValidatedInput