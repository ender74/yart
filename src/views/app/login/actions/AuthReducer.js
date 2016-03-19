import C from './AuthConstants'
import $ from 'jquery'
import Parse from 'parse'

function loginSucceded(state, user) {
    state.user = user
    return state
}

function logout(state) {
    return {}    
}

function signUpFailed(state, user, code, message) {
    alert(message)
}

function loginFailed(state, user, code, message) {
    alert(message)
}

function authReducer(state,action){
    console.log(action)
    console.log(state)
    state = state ? JSON.parse(JSON.stringify(state)) : {}  //quick deep copy
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
    console.log(state)
    return state
}

export default authReducer