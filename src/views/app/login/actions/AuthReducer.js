import C from './AuthConstants'
import $ from 'jquery'
import Parse from 'parse'

const initialState = {
}

function loginSucceded(state, user) {
    state = Object.assign({}, state)
    state.user = user
    return state
}

function logout(state) {
    return initialState
}

function signUpFailed(state, user, code, message) {
    alert(message)
}

function loginFailed(state, user, code, message) {
    alert(message)
}

function authReducer(state = initialState,action){
    switch (action.type) {
        case C.AUTH_LOGIN_SUCCEDED:
            state=loginSucceded(state, action.user)
            break;
        case C.AUTH_LOGOUT:
            state=logout(state);
            break;
        case C.AUTH_SIGNUP_FAILED:
            state=signUpFailed(state, action.user, action.code, action.error)
            break;
        case C.AUTH_LOGIN_FAILED:
            state=loginFailed(state, action.user, action.code, action.error)
            break;
    }
    return state
}

export default authReducer