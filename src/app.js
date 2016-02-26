'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import TodoStore from './todoStore'
import Todos from './views/app/todos'

$.getJSON( 'todos.json', function( data ) {
    TodoStore.setAll(data.todos)
    ReactDOM.render(<Todos/>, document.getElementById("container"))
})