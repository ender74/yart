import React, { Component } from 'react'
import Todos from './todos'

class AppView extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return <article>
            <header>Log84.de<hr/></header>
            <Todos />
            <footer><hr/>http://www.log84.de</footer>
            </article>
    }
}

export default AppView