import React, { Component } from 'react'
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

const AppHeader = () => {
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
                    <NavItem eventKey={1} href="#">Link</NavItem>
                    <NavItem eventKey={2} href="#">Link</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem href="#"><Glyphicon glyph='log-in' /> Anmelden</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppHeader