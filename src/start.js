'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import moment from 'moment'
import Parse from 'parse'

import AppView from './views/app/AppView'

const locale = window.navigator.userLanguage || window.navigator.language
require('moment/locale/de')

Parse.initialize('www.log84.de');
Parse.serverURL = '../parse'

ReactDOM.render(<AppView />, document.getElementById("container"))
