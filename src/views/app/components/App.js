import React, { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'

const App = ( { children } ) => {
    return <div>
            <header style={ styles.header }>
                <a href='http://www.log84.de'>Log84.de</a>
                <Link to='/login'>Login</Link><br/>
            </header>
            <div style={ styles.main }>
                { children }
            </div>
            <footer style={ styles.footer }>
                <a href="http://www.flaticon.com/authors/freepik">Icon design by Freepik</a> 
            < /footer>
    </div>
}

const styles = {
    header: {
        background: 'rgba(255,255,255,0.9)',
        position: 'fixed',
        top: '0',
        left: '0px',
        zIndex: '100000',
        minHeight: '40px',
        padding: '5px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        'margin': '60px 15px 0px 0px',       
        'minHeight': '300px'
    },
    footer: {
        background: 'rgba(255,255,255,0.9)',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100%',
        zIndex: '100000',
        height: '40px',
        padding: '15px 0px 0px 10px'
    }
}

export default Radium(App)