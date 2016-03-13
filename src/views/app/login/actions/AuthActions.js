import C from './AuthConstants'

const AuthActions = {
    loginSucceeded(user, accessToken) {
        return {
            type: C.AUTH_LOGIN_SUCCEDED,
            user: user,
            accessToken: accessToken
        }    
    },
    
    logout() {
        return {
            type: C.AUTH_LOGOUT
        }
    }
}

export default AuthActions
