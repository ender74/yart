import React, { Component } from 'react'
import { Grid, Row, Col, Jumbotron, Button, Modal, Glyphicon } from 'react-bootstrap'

import UsernamePassword from './UsernamePassword'
import Register from './Register'

const LoginModal = ({ show, hide, onUpLogin }) => {
    return (
        <Modal show={ show } onHide={ hide } backdrop={ true } bsSize="large" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true } />
            <Modal.Body>
                <Grid>
                    <Row>
                        <Col xs={ 3 } xsOffset = { 3 }>
                            <Button bsStyle="danger"><Glyphicon glyph='log-in' /> Google</Button>
                        </Col>
                        <Col xs={ 3 }>
                            <Button bsStyle="primary"><Glyphicon glyph='log-in' /> Facebook</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={ 2 } xsOffset = { 5 }>
                            oder
                        </Col>
                    </Row>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <UsernamePassword onSubmit={ onUpLogin } />
            </Modal.Footer>
        </Modal>
    )
}

class LoginView extends Component {
    constructor() {
        super()
        this.state={}
    }

    render() {
        return (
            <Grid>
                <Jumbotron>
                    <h1>Log84.de</h1>
                    <p>Organisiere Deine Ideen.</p>
                    <p><Button bsStyle="primary">Mehr erfahren</Button></p>
                    <p><Button bsStyle="success" onClick={ () => this.setState({showLogin: true}) }><Glyphicon glyph='log-in' /> Anmelden</Button></p>
                </Jumbotron>
                <LoginModal show={ this.state.showLogin } hide={ () => this.setState({showLogin: false}) } onUpLogin={ this.props.onUpLogin }/>
            </Grid>
        )
    }
}

export default LoginView