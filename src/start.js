'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Parse from 'parse'
import moment from 'moment'

import polyfills from './polyfills'

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'
import esLocaleData from 'react-intl/locale-data/es'

function init() {
    require('moment/locale/de')
    require('moment/locale/fr')
    require('moment/locale/es')

    polyfills()

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
}

function renderApp() {
    const AppView = require('./views/app/AppView')
    ReactDOM.render(<AppView />, document.getElementById("container"))
}

init()
renderApp()
