import 'whatwg-fetch'

import { update } from 'react-intl-redux'

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

const setLocale = (locale) => {
    return (dispatch) => {
        const localMessages = "messages_" + locale + ".json"
        const defaultMessages = "messages.json"
        const doFetch = (src) => {
            return fetch( src )
                .then(checkStatus)
                .then(response => { return response.json() })
                .then(messages => { dispatch(update({locale, messages})) })
        }
        doFetch(localMessages)
            .catch(error => { doFetch(defaultMessages) })
    }
}

export default {
    setLocale: setLocale
}