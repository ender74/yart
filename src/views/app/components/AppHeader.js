import React, { Component } from 'react'
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const AppHeader = ({ user, logout }) => {
    var logout
    if (user)
        logout = (
            <Nav pullRight>
                <NavItem onClick={ logout }><Glyphicon glyph='log-out' />
                    <FormattedMessage
                        id='logout'
                        defaultMessage='Logout'
                    />
                </NavItem>
            </Nav>
        )
    return (
        <Navbar fixedTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="https://www.log84.de">Log84.de</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                {logout}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppHeader