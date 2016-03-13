'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import moment from 'moment'

import AppView from './views/app/AppView'

const locale = window.navigator.userLanguage || window.navigator.language
require('moment/locale/de')

ReactDOM.render(<AppView/>, document.getElementById("container"))
