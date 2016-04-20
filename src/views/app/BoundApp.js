import {connect} from 'react-redux'
import $ from 'jquery'
import {update} from 'react-intl-redux'

import AuthActions from './login/actions/AuthActions'
import App from './components/App'

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

var mapDispatchToProps = function(dispatch) { 
    return {
        logout: () => dispatch(AuthActions.logout()),
        setLocale: (locale) => dispatch(
            (dispatch) => {
                $.getJSON( "messages_" + locale + ".json" )
                    .done(function( messages ) {
                        dispatch(
                            update(
                                {
                                    locale,
                                    messages
                                }
                            )
                        )
                    })
                    .fail(
                        function( jqxhr, textStatus, error ) {
                            $.getJSON( "messages.json" )
                            .done(
                                function( messages ) {
                                    dispatch(
                                        update(
                                            {
                                                locale,
                                                messages
                                            }
                                        )
                                    )
                                }
                            )
                        }
                    )
            }
        )
    }
}

const BoundApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default BoundApp