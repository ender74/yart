import C from './AuthConstants'
import $ from 'jquery'

function loginSucceded(state, user, accessToken) {
    state.user = user
    state.accessToken = accessToken
    return state
}

function logout(state) {
    return {}    
}

function authReducer(state,action){
    console.log(action)
    console.log(state)
    state = state ? JSON.parse(JSON.stringify(state)) : {}  //quick deep copy
    switch (action.type) {
        case C.AUTH_LOGIN_SUCCEDED:
            state=loginSucceded(state, action.user, action.accessToken)
            break;
        case C.AUTH_LOGOUT:
            state=logout(state);
            break;
    }
    console.log(state)
    return state
}

export default authReducer