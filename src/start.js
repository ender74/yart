'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Parse from 'parse'
import moment from 'moment'

import AppView from './views/app/AppView'

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'
import esLocaleData from 'react-intl/locale-data/es'

require('moment/locale/de')
require('moment/locale/fr')
require('moment/locale/es')

const locales = [enLocaleData, deLocaleData[0], frLocaleData, esLocaleData]
const flatLocales = []

locales.forEach(f => {
    if (typeof(f) == 'array') {
        f.forEach(ff => flatLocales.push(ff))
    } else {
        flatLocales.push(f)
    }
})

addLocaleData( flatLocales )

Parse.initialize('www.log84.de');
Parse.serverURL = '../parse'

ReactDOM.render(<AppView />, document.getElementById("container"))
