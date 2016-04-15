'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Parse from 'parse'

import AppView from './views/app/AppView'

Parse.initialize('www.log84.de');
Parse.serverURL = '../parse'

ReactDOM.render(<AppView />, document.getElementById("container"))
