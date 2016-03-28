import React, { Component } from 'react'

import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

const App = ( { children, user, logout } ) => {
    return (
        <div>
            <header>
                <AppHeader user={user} logout={logout} />
            </header>
            <div>
                { children }
            </div>
            <footer>
                <AppFooter />
            </footer>
        </div>
    )
}

export default App