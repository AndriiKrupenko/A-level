import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, put, takeEvery, call, takeLatest, select } from 'redux-saga/effects';
import { actionPromise, actionPending, actionResolved, actionRejected, actionLogin, actionAuthLogin, actionRegister, actionUploadFile, actionAvatar, actionAllAds, actionAboutMe, actionSearchResult, actionAdById, gql } from "../actions";
import { history } from '../App';

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

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

//-----------------------reducers-------------------------

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

function searchReducer(state={}, {type, ...params}) {
    if (type === 'SEARCH_RESULT'){
        return {searchResult: {...params}}
    }
    return state
}

function feedReducer(state = [], { type, ads }) {
    if (type === 'FEED_RESULT') {
        return [...state, ...ads.payload]
    } else if (type === 'FEED_CLEAR_START') { 
        return []
    }
    return state
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers({ promiseReducer: promiseReducer, authReducer: authReducer, favoriteReducer: localStoredReducer(favoriteReducer, 'favorite'), searchReducer: searchReducer, feedReducer: feedReducer }), applyMiddleware(sagaMiddleware))

// ----------- old store version (with localStoredReducer for promiseReducer and feedReducer)---------------
// const store = createStore(combineReducers({ promiseReducer: localStoredReducer(promiseReducer, 'forPromiseReducer'), authReducer: authReducer, favoriteReducer: localStoredReducer(favoriteReducer, 'favorite'), searchReducer: searchReducer, feedReducer: localStoredReducer(feedReducer, 'feedReducer') }), applyMiddleware(sagaMiddleware))



// --------------------------Saga----------------------------
function* commentWorker({ _id, text }) {
    yield call(promiseWorker, actionPromise('addComment', gql(`mutation addComment($_id: ID, $text: String){
        CommentUpsert(comment: {ad: {_id: $_id}, text: $text}){
                    _id 
                }
            }`, { _id, text })))
    yield put(actionAdById(_id))  
}

function* commentWatcher() { 
    yield takeEvery('NEW_COMMENT', commentWorker)
}

const actionFeedClearStart = () => ({ type: 'FEED_CLEAR_START' })

function* feedClearWorker() {
    yield put(actionFeedClearStart()) 
}

function* feedClearWatcher(){
    yield takeEvery('FEED_CLEAR', feedClearWorker)
}

const actionFeed = (ads) => ({ type: 'FEED_RESULT', ads })

function* feedWorker() {
    let payload = yield call(promiseWorker, actionPromise('feedAds', gql(`query feedAds($query: String){
        AdFind(query: $query) {
            _id, 
            owner {
                login
            },
            images {
                url
            },
            title,
            description,
            price
        }
    }`,
        { query: JSON.stringify([ {}, { sort: [{ _id: -1 }], skip: [(yield select()).feedReducer.length] }]) } 
    )))
     
    yield put(actionFeed({payload})) 
}

function* feedWatcher(){
    yield takeEvery('FEED_START', feedWorker)
}



function* searchWorker({ text }) {
    if (text) { 
    yield put(actionSearchResult({payload: null})) 
    yield delay(500) //аналог await
    let payload = yield gql( `
            query gf($query: String){
                AdFind(query: $query){
                    _id, title, description, price, images{
                        _id, url
                    }, owner {login}
                }
            }`, {query: JSON.stringify([
                        {
                            $or: [{title: `/${text.trim().split(/\s+/).join('|')}/`}, {description: `/${text.trim().split(/\s+/).join('|')}/`}] 
                        },
                        {
                            sort: [{name: 1}]} 
                        ])
            }) 
    yield put(actionSearchResult({payload})) 
    // console.log('search end' , text)   
    } 
}

function* searchWatcher(){
    yield takeLatest('SEARCH', searchWorker)
}



function* setAvatarWorker({ file }) {
    const { _id } = yield call(promiseWorker, actionUploadFile(file))
    const myId = store.getState().authReducer.payload.sub.id
    yield put(actionAvatar(myId, _id)) 
    yield put(actionAboutMe())  
} 

function* setAvatarWatcher() { 
    yield takeEvery('SET_AVATAR', setAvatarWorker)
}



function* registerWorker({ login, password }) {
    const user = yield call(promiseWorker, actionRegister(login, password))
    if (user) { 
        const token = yield call(promiseWorker, actionLogin(login, password))
        if (token) {
            yield put(actionAuthLogin(token))
            yield put(actionAllAds())
            yield put(actionAboutMe())
            yield history.push('/')
        }
    } 
} 

function* registerWatcher() { 
    yield takeEvery('FULL_REGISTER', registerWorker)
}



function* loginWorker({ login, password }) {
    const token = yield call(promiseWorker, actionLogin(login, password))
    if (token) { 
        yield put(actionAuthLogin(token))
        yield put(actionAllAds())
        yield put(actionAboutMe())
        yield history.push('/')
    } 
} 

function* loginWatcher() { 
    yield takeEvery('FULL_LOGIN', loginWorker)
}



function* promiseWorker(action) {
    const { type, name, promise } = action

    yield put(actionPending(name))
    try{
        let payload = yield promise
        yield put(actionResolved(name, payload))
        return payload
    }
    catch(error){
        yield put(actionRejected(name, error))
    }
}    

function* promiseWatcher() { 
    yield takeEvery('PROMISE_START', promiseWorker)
}



function* rootSaga() { 
    yield all([
        promiseWatcher(),
        loginWatcher(),
        registerWatcher(),
        setAvatarWatcher(),
        searchWatcher(),
        feedWatcher(),
        feedClearWatcher(),
        commentWatcher()
    ])
}

sagaMiddleware.run(rootSaga)

store.subscribe(() => console.log(store.getState()))

export default store