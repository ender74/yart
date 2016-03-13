import React, { Component } from 'react'
import ErrorDecorator from './ErrorDecorator'

class Input extends Component {
    render() {
        const { error, touched } = this.props
        return <ErrorDecorator error={ error } touched={ touched }><input {...this.props} /></ErrorDecorator>
    }
}

export default Input