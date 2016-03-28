import React, { Component } from 'react'
import { Button, ButtonToolbar, Modal, Glyphicon } from 'react-bootstrap'

import UsernamePassword from './UsernamePassword'

const LoginModal = ({ show, hide, onUpLogin }) => {
    return (
        <Modal show={ show } onHide={ hide } backdrop={ true } aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true }>
                Anmelden
            </Modal.Header>
            <Modal.Title style={ styles.title }>
                <ButtonToolbar>
                    <Button bsStyle="danger"><Glyphicon glyph='log-in' /> Google</Button>
                    <Button bsStyle="primary"><Glyphicon glyph='log-in' /> Facebook</Button>
                </ButtonToolbar>
            </Modal.Title>
            <Modal.Body>
                <UsernamePassword onSubmit={ onUpLogin } />
            </Modal.Body>
        </Modal>
    )
}

const styles = {
    title: {
        marginLeft: '35%',
        marginTop: '10px'
    }
}

export default LoginModal