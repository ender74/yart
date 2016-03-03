import React, { Component } from 'react'

import Todos from './components/Todos'
import TodoConstants from '../../todoConstants'
import TodoStore from '../../todoStore'
import AppDispatcher from '../../appDispatcher'

class AppView extends Component {
    render() {
        return <div>
                <header style={ styles.header }>
                    <a href='http://www.log84.de'>Log84.de</a>< hr />
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
    },
    main: {
        'margin-top': '2.0em'        
    },
    footer: {
        'margin-top': '2.0em'
    }
}

export default AppView