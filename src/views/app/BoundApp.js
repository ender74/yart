import {connect} from 'react-redux'

import LocaleActions from './actions/LocaleActions'
import AuthActions from './login/actions/AuthActions'
import { userSelector } from './login/actions/AuthSelector'
import App from './components/App'

function mapStateToProps(state) {
    const user = userSelector(state)

    return {
        user
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        logout: () => dispatch(AuthActions.logout()),
        setLocale: (locale) => dispatch(LocaleActions.setLocale(locale))
    }
}

const BoundApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default BoundApp