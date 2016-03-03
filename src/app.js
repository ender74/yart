'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import TodoStore from './todoStore'
import AppView from './views/app/AppView'

$.getJSON( 'todos.json', function( data ) {
    TodoStore.setAll(data.todos)
    ReactDOM.render(<AppView/>, document.getElementById("container"))
})