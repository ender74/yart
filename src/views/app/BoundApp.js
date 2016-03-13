import {connect} from 'react-redux'

import AuthActions from './login/actions/AuthActions'
import App from './components/App'

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        logout: () => dispatch(AuthActions.logout())
    }
}

const BoundApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default BoundApp