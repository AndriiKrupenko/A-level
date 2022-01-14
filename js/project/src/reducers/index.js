import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { actionAllAds, actionAboutMe } from "../actions"

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

const localStoredReducer = (reducer, localStorageName) => 
    (state, action) => { 
        let newState;
        if ((state === undefined) && localStorage[localStorageName]) {
            newState = JSON.parse(localStorage[localStorageName])
        } else { 
            newState = reducer(state, action)
        }

        localStorage[localStorageName] = JSON.stringify(newState)

        return newState
    }

function promiseReducer(state={}, {type, name, status, payload, error}){
        if (type === 'PROMISE'){
            return {
                ...state, [name]: {status, payload: (status === 'PENDING' && state[name] && state[name].payload) || payload, error}
            }
        }
        return state
    }
    
function authReducer(state, {type, token}){
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
            console.log(localStorage.authToken)
            return {}
        }
        return state
    }

function favoriteReducer(state = {}, { type, ad={} }){
    const {_id } = ad
    const types = {
        FAVORITE_ADD() {
            return {
                ...state,
                [_id]: ad
            }
        },
        FAVORITE_REMOVE(){ 
            let newState = { ...state }
            delete newState[_id]
            return {
                ...newState
            }            
        },
        // FAVORITE_CLEAR(){
        //     return {}
        // },
    }

    if (type in types)
        return types[type]()

    return state
}

const store = createStore(combineReducers({ promiseReducer: localStoredReducer(promiseReducer, 'forPromiseReducer'), authReducer: authReducer, favoriteReducer: localStoredReducer(favoriteReducer, 'favorite') }), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
localStorage.authToken && store.dispatch(actionAllAds())
localStorage.authToken && store.dispatch(actionAboutMe())

export default store