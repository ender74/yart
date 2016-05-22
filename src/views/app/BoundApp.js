import {connect} from 'react-redux'

import LocaleActions from './actions/LocaleActions'
import TodoActions from './todos/actions/TodosActions'
import AuthActions from './login/actions/AuthActions'
import { userSelector } from './login/actions/AuthSelector'
import { filtersSelector } from './todos/actions/TodosSelector'
import App from './components/App'

function mapStateToProps(state) {
    const user = userSelector(state)
    const locale = state.intl.locale
    const activeFilters = filtersSelector(state)

    return {
        user,
        locale,
        activeFilters
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        logout: () => dispatch(AuthActions.logout()),
        setLocale: (locale) => dispatch(LocaleActions.setLocale(locale)),
        setActiveFilter: (filter) => dispatch(TodoActions.addFilter(filter))
    }
}

const BoundApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default BoundApp