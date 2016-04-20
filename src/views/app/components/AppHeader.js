import React, { Component } from 'react'
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'
import { FormattedMessage, injectIntl } from 'react-intl'

const AppHeader = ({ user, logout, setLocale, intl }) => {
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
    const language = intl.formatMessage({
        id: 'app.language',
        defaultMessage: 'Language'
    })
    return (
        <Navbar fixedTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="https://www.log84.de">Log84.de</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={1} title={ language } id='select-language'>
                        <MenuItem eventKey={1.1} onClick={ () => setLocale('en') }>
                            <FormattedMessage
                                id='app.language_en'
                                defaultMessage='English'
                            />
                        </MenuItem>
                        <MenuItem eventKey={1.2} onClick={ () => setLocale('de') }>
                            <FormattedMessage
                                id='app.language_de'
                                defaultMessage='German'
                            />
                        </MenuItem>
                    </NavDropdown>
                </Nav>
                {logout}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default injectIntl(AppHeader)