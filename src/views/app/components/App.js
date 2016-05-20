import React, { Component } from 'react'

import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

const App = ( props ) => {
    const { children } = props

    return (
        <div>
            <header>
                <AppHeader {...props} />
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