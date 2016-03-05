import React, { Component } from 'react'

import Todos from './components/Todos'
import TodoConstants from '../../todoConstants'
import TodoStore from '../../todoStore'
import AppDispatcher from '../../appDispatcher'

class AppView extends Component {
    render() {
        return <div>
                <header style={ styles.header }>
                    <a href='http://www.log84.de'>Log84.de</a>
                </header>
                <div style={ styles.main }>
                    <Todos />
                </div>
                <footer style={ styles.footer }>
                    <hr/>
                    <a href="http://www.flaticon.com/authors/freepik">Icon design by Freepik</a> 
                < /footer>
            </div>
    }
}

const styles = {
    header: {
        'background': 'rgba(255,255,255,0.3)',
        'position': 'fixed',
        'top': '0',
        'left': '0px',
        'z-index': '100000',
        'min-height': '40px',
        'margin': 'auto',
        'padding': '5px',
        'width': '100%'
    },
    main: {
        'margin-top': '60px',       
        'min-height': '300px'
    },
    footer: {
        'margin-top': '20px'
    }
}

export default AppView