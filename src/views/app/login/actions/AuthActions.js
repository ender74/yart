import Parse from 'parse'

import C from './AuthConstants'

const AuthActions = {
    loginSucceeded(user) {
        return {
            type: C.AUTH_LOGIN_SUCCEDED,
            user: user
        }    
    },
        
    logout() {
        return {
            type: C.AUTH_LOGOUT
        }
    },
    
    signUpFailed(user, code, error) {
        return {
            type: C.AUTH_SIGNUP_FAILED,
            user: user,
            code: code,
            error: error
        }
    },
    
    loginFailed(user, code, error) {
        return {
            type: C.AUTH_LOGIN_FAILED,
            user: user,
            code: code,
            error: error
        }
    },
    
    loginBasic(username, password) {
        return dispatch => {
            Parse.User.logIn(username, password, {
                success: function(user) {
                    dispatch(AuthActions.loginSucceeded(user.toJSON()))
                },
                error: function(user, error) {
                    dispatch(AuthActions.signUpFailed(user, error.code, error.message))
                }
            })            
        }
    },
    
    signUp(username, password, email) {
        return dispatch => {
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);

            user.signUp(null, {
                success: function(user) {
                    dispatch(AuthActions.loginSucceeded(user.toJSON()))
                },
                error: function(user, error) {
                    dispatch(AuthActions.signUpFailed(user, error.code, error.message))
                }
            })
        }
    }    
}

export default AuthActions
