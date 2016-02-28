import React, { Component } from 'react'
import Todos from './todos'
import TodoConstants from '../../todoConstants'
import TodoStore from '../../todoStore'
import AppDispatcher from '../../appDispatcher'

class AppView extends Component {
    render() {
        return <div>
                <header className='pageHeader'>Log84.de < hr /></header>
                <div className='mainArea' id='main'>
                    <Todos />
                </div>
                <footer className='pageFooter'><hr/>http:// www.log84.de < /footer>
            </div>
    }
}

export default AppView