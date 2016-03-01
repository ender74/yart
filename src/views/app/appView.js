import React, { Component } from 'react'

import Todos from './todos'
import TodoConstants from '../../todoConstants'
import TodoStore from '../../todoStore'
import AppDispatcher from '../../appDispatcher'

class AppView extends Component {
    render() {
        return <div>
                <header style={ styles.header }>Log84.de < hr /></header>
                <div style={ styles.main }>
                    <Todos />
                </div>
                <footer style={ styles.footer }><hr/><a href='http://www.log84.de'>http://www.log84.de</a> < /footer>
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