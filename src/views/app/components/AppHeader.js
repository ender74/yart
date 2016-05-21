import React, { Component } from 'react'
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Filters } from '../todos/actions/Types'

class AppHeader extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false
        }
    }


    render() {
        const { user, locale, activeFilter, logout, setActiveFilter, setLocale, intl } = this.props

        const language = intl.formatMessage({
            id: 'app.language',
            defaultMessage: 'Language'
        })
        const filter = intl.formatMessage({
            id: 'todo.filter',
            defaultMessage: 'Filter'
        })
        const filterDue = intl.formatMessage({
            id: 'todo.filterDue',
            defaultMessage: 'Due'
        })

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

        var logoutItem, options
        if (user) {
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
            options = (
                <Nav>
                    <NavDropdown eventKey={2} title={ filter } id='select-filter'>
                        <NavItem
                            active={ activeFilter === Filters.DEFAULT }
                            onClick={ () => {
                                collapseNav()
                                setActiveFilter(Filters.DEFAULT)
                            }
                        }>
                            <FormattedMessage
                                id='todo.showOpen'
                                defaultMessage='show open todos'
                            />
                        </NavItem>
                        <NavItem
                            active={ activeFilter === Filters.ALL }
                            onClick={ () => {
                                collapseNav()
                                setActiveFilter(Filters.ALL)
                            }
                        }>
                            <FormattedMessage
                                id='todo.showAll'
                                defaultMessage='show all todos'
                            />
                        </NavItem>
                        <NavDropdown eventKey={2} title={ filterDue } id='select-due-filter'>
                            <NavItem
                                active={ activeFilter === Filters.OVERDUE }
                                onClick={ () => {
                                    collapseNav()
                                    setActiveFilter(Filters.OVERDUE)
                                }
                            }>
                                <FormattedMessage
                                    id='todo.overdue'
                                    defaultMessage='overdue'
                                />
                            </NavItem>
                            <NavItem
                                active={ activeFilter === Filters.DUE_TODAY }
                                onClick={ () => {
                                    collapseNav()
                                    setActiveFilter(Filters.DUE_TODAY)
                                }
                            }>
                                <FormattedMessage
                                    id='todo.dueToday'
                                    defaultMessage='today'
                                />
                            </NavItem>
                            <NavItem
                                active={ activeFilter === Filters.DUE_THISWEEK }
                                onClick={ () => {
                                    collapseNav()
                                    setActiveFilter(Filters.DUE_THISWEEK)
                                }
                            }>
                                <FormattedMessage
                                    id='todo.dueThisWeek'
                                    defaultMessage='this week'
                                />
                            </NavItem>
                            <NavItem
                                active={ activeFilter === Filters.DUE_NEXTWEEK }
                                onClick={ () => {
                                    collapseNav()
                                    setActiveFilter(Filters.DUE_NEXTWEEK)
                                }
                            }>
                                <FormattedMessage
                                    id='todo.dueNextWeek'
                                    defaultMessage='next week'
                                />
                            </NavItem>
                        </NavDropdown>
                    </NavDropdown>
                </Nav>
            )
        }
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
                            <NavItem eventKey={1.1} onClick={ () => mySetLocale('en')} active={ locale === 'en' }>
                                <FormattedMessage
                                    id='app.language_en'
                                    defaultMessage='English'
                                />
                            </NavItem>
                            <NavItem eventKey={1.2} onClick={ () => mySetLocale('de')} active={ locale === 'de' }>
                                <FormattedMessage
                                    id='app.language_de'
                                    defaultMessage='German'
                                />
                            </NavItem>
                        </NavDropdown>
                    </Nav>
                    {options}
                    {logoutItem}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default injectIntl(AppHeader)