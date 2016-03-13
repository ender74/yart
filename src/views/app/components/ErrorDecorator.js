import React, { Component } from 'react'
import Radium from 'radium'

class ErrorDecorator extends Component {
    render() {
        const { children, error, touched } = this.props
        const showError = touched && error
        return <div style={ styles.div }>
                { children }
                <p style={ showError ? styles.error : styles.hidden }>{ error }</p>
            </div>
    } 
}

const styles = {
    div: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'    
    },
    error: {
        color: 'red',
        margin: '0px 0px 0px 15px'
    },
    hidden: {
        display: 'none'
    }
}

export default Radium(ErrorDecorator)