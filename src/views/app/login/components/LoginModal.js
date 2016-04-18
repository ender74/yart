import React, { Component } from 'react'
import { Button, ButtonToolbar, Modal, Glyphicon } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

import UsernamePassword from './UsernamePassword'

const LoginModal = ({ show, hide, onUpLogin }) => {
    return (
        <Modal show={ show } onHide={ hide } backdrop={ true } aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true }>
                <FormattedMessage
                    id='login.login'
                    defaultMessage='Login existing user'
                />
            </Modal.Header>
            <Modal.Title style={ styles.title }>
                <div style={ styles.buttons }>
                    <ButtonToolbar>
                        <Button bsStyle="danger"><Glyphicon glyph='log-in' /> Google</Button>
                        <Button bsStyle="primary"><Glyphicon glyph='log-in' /> Facebook</Button>
                    </ButtonToolbar>
                </div>
            </Modal.Title>
            <Modal.Body>
                <UsernamePassword onSubmit={ onUpLogin } />
            </Modal.Body>
        </Modal>
    )
}

const styles = {
    title: {
        marginTop: '10px',
        display: 'flex'
    },

    buttons: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export default LoginModal