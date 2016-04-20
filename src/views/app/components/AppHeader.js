import React, { Component } from 'react'
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'
import { FormattedMessage, injectIntl } from 'react-intl'

class AppHeader extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false
        }
    }


    render() {
        const { user, logout, setLocale, intl } = this.props

        const collapseNav = () => {
            this.setState({
                expanded: false
            })
        }
        const myLogout = () => {
            collapseNav()
            logout()
        }
        const mySetLocale = (locale) => {
            collapseNav()
            setLocale(locale)
        }

        var logoutItem
        if (user)
            logoutItem = (
                <Nav pullRight>
                    <NavItem onClick={ myLogout }><Glyphicon glyph='log-out' />
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
            <Navbar fixedTop fluid expanded={this.state.expanded} onToggle={(expanded) => this.setState({expanded: expanded})}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="https://www.log84.de">Log84.de</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title={ language } id='select-language'>
                            <MenuItem eventKey={1.1} onClick={ () => mySetLocale('en') }>
                                <FormattedMessage
                                    id='app.language_en'
                                    defaultMessage='English'
                                />
                            </MenuItem>
                            <MenuItem eventKey={1.2} onClick={ () => mySetLocale('de') }>
                                <FormattedMessage
                                    id='app.language_de'
                                    defaultMessage='German'
                                />
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                    {logoutItem}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default injectIntl(AppHeader)