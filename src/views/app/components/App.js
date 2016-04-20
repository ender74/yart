import React, { Component } from 'react'

import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

const App = ( { children, user, logout, setLocale } ) => {
    return (
        <div>
            <header>
                <AppHeader user={user} logout={logout} setLocale={setLocale} />
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