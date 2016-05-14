import 'whatwg-fetch'
import checkStatus from 'fetch-check-http-status'
import { update } from 'react-intl-redux'


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