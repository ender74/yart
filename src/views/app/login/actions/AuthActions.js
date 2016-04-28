import Parse from 'parse'

import C from './AuthConstants'
import TodosActions from '../../todos/actions/TodosActions'
import TagActions from '../../todos/actions/TagsActions'

const AuthActions = {
    loginBasic(username, password) {
        return dispatch => {
            Parse.User.logIn(username, password, {
                success: function(user) {
                    dispatch(TodosActions.load())
                    dispatch(TagActions.load())
                    dispatch(AuthActions.loginSucceeded(user.toJSON()))
                },
                error: function(user, error) {
                    dispatch(AuthActions.signUpFailed(user, error.code, error.message))
                }
            })            
        }
    },

    loginSucceeded(user) {
        return {
            type: C.AUTH_LOGIN_SUCCEDED,
            user: user
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
    
    logout() {
        return {
            type: C.AUTH_LOGOUT
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
    },    

    signUpFailed(user, code, error) {
        return {
            type: C.AUTH_SIGNUP_FAILED,
            user: user,
            code: code,
            error: error
        }
    }
}

export default AuthActions
