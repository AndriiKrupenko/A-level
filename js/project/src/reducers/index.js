import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { actionAllAds } from "../actions"

function jwtDecode(token) {
    try {
        let [, login,] = token.split('.')
        let decodedLogin = atob(login)
        let user = JSON.parse(decodedLogin)
        return user
    }
    catch {
        return false
    }
}

const reducers = {
    promiseReducer(state={}, {type, name, status, payload, error}){
        if (type === 'PROMISE'){
            return {
                ...state,
                [name]:{status, payload, error}
            }
        }
        return state
    },
    authReducer(state, {type, token}){
        if (!state) {
            if (localStorage.authToken) {
                type = 'AUTH_LOGIN'
                token = localStorage.authToken
            } else {
                return {}
            }
        }
        if (type === 'AUTH_LOGIN') {
            let auth = jwtDecode(token)
            if (auth) {
                localStorage.authToken = token
                return { token, payload: auth }
            }
        }
        if (type === 'AUTH_LOGOUT') {
            localStorage.authToken = ''
            return {}
        }
        return state
    },
}

let store = createStore(combineReducers(reducers), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
store.dispatch(actionAllAds())

export default store