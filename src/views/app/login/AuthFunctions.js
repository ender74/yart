import Parse from 'parse'

import AuthActions from './actions/AuthActions'
import Register from './components/Register'

export function signUp(username, password, email, signUpSucceeded, signUpFailed) {
   var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp(null, {
        success: function(user) {
            signUpSucceeded(user)
        },
        error: function(user, error) {
            signUpFailed(user, error)
        }
    })
}

export function login(username, password, loginSucceeded, loginFailed) {
    Parse.User.logIn(username, password, {
        success: function(user) {
            loginSucceeded(user)
        },
        error: function(user, error) {
            loginFailed(user, error)
        }
    })    
}

export function logout(logoutSucceeded) {
    logoutSucceeded()
}