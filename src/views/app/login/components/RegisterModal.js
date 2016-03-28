import React, { Component } from 'react'
import { Button, ButtonToolbar, Modal, Glyphicon } from 'react-bootstrap'

import Register from './Register'

const RegisterModal = ({ show, hide, onSignUp }) => {
    return (
        <Modal show={ show } onHide={ hide } backdrop={ true } aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true }>
                Registrieren
            </Modal.Header>
            <Modal.Body>
                <Register onSubmit={ onSignUp } />
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

export default RegisterModal