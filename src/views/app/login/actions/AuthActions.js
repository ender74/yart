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
    }
}

export default AuthActions
