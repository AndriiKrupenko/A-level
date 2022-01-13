import { history } from '../App';

const getGQL = url =>
    (query, variables = {}) =>
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                ...(localStorage.authToken ? { "Authorization": "Bearer " + localStorage.authToken } :
                    {})
            },
            body: JSON.stringify({ query, variables })
        })
            .then(res => res.json())
                .then(data => {
                    if (data.errors && !data.data)
                        throw new Error(JSON.stringify(data.errors))
                    return data.data[Object.keys(data.data)[0]]
                })
    
const gql = getGQL(`/graphql`)

// export const actionSearch = text => ({type: 'SEARCH', text})
// export const actionSearchResult = payload => ({type: 'SEARCH_RESULT', payload})

//---------------for-promiseReducer--------------------------------------------------------------
export const actionPromise = (name, promise) => {
    const actionPending = name => ({ type: 'PROMISE', status: 'PENDING', name })
    const actionResolved = (name, payload) => ({ type: 'PROMISE', status: 'RESOLVED', name, payload })
    const actionRejected = (name, error) => ({ type: 'PROMISE', status: 'REJECTED', name, error })

    return async dispatch => {
        dispatch(actionPending(name)) 
        try {
            let payload = await promise
            dispatch(actionResolved(name, payload))
            return payload
        }
        catch (error) {
            dispatch(actionRejected(name, error))
        }
    }
}

export const actionUploadFile = (file) => {
    let fd = new FormData
    fd.append('photo', file)
    return actionPromise('photo', fetch('/upload', {
            method: 'POST',
            headers: localStorage.authToken ? { "Authorization": "Bearer " + localStorage.authToken } : {},
            body: fd
    }).then(res => res.json()))
}

export const actionSetAvatar = file =>
    async (dispatch, getState) => { 
        let { _id } = await dispatch(actionUploadFile(file))
        let state = getState()
        let myId = state.authReducer.payload.sub.id
        await dispatch(actionPromise('setAvatar', gql(`mutation setAvatar($myId: String, $_id: ID){
            UserUpsert(user:{_id: $myId, avatar: {_id: $_id}}){
                _id, avatar{
                    _id
                }
            }
        }`, { myId, _id })))
        return dispatch(actionAboutMe())
    }

export const actionAboutMe = () =>
    async (dispatch, getState) => { 
        let state = getState()
        let myId = state.authReducer.payload.sub.id
        return dispatch(actionPromise('aboutMe', gql(`query aboutMe($query: String){
            UserFindOne(query:$query){
                _id,
                login,
                nick,
                avatar {
                    _id,
                    url
                },
                createdAt,
            }
        }`, { query: JSON.stringify([{ _id: myId }])  })))
    } 


export const actionAllAds = () => 
    actionPromise('allAds', gql(`query ads{
        AdFind(query: "[{}]") {
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
    }`))

export const actionAdById = (_id) => 
    actionPromise('adById', gql(`query adById($query: String){
        AdFindOne(query:$query){
            _id,
            owner {
              login
            },
            images {
              url
            },
            comments {
              text
            },
            createdAt,
            title, 
            description,
            tags,
            address,
            price,
			}
        }`,
        {query: JSON.stringify([
            { _id },
            // { skip: [100] } //пропустить часть результатов?
        ])}
    ))

export const actionUserById = (_id) => 
    actionPromise('userById', gql(`query userById($query: String){
        UserFindOne(query:$query){
            login
				}
        }`,
        {query: JSON.stringify([{ _id }])}
    ))

//---------------for-promiseReducer-end----------------------------------------------------------



//---------------for-authReducer-----------------------------------------------------------------
export const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })

export const actionLogin = (login, password) =>
    actionPromise('login', gql(`query login($login: String!, $password: String!){
        login(
            login:$login,
            password:$password
        )
    }`, { login, password }))

export const actionFullLogin = (login, password) =>
    async dispatch => {
        let token = await dispatch(actionLogin(login, password))
        if (token){
            dispatch(actionAuthLogin(token))
            dispatch(actionAllAds())
            dispatch(actionAboutMe())
            history.push('/')
        }
    }

export const actionRegister = (login, password) =>
    actionPromise('reg', gql(`mutation reg($login: String!, $password: String!){
        createUser(
            login:$login, 
            password:$password){
                login _id
            }
    }`, { login, password }))

export const actionFullRegister = (login, password) =>
    async dispatch => {
        let user = await dispatch(actionRegister(login, password))
        if (user) {
            let token = await dispatch(actionLogin(login, password))
            if (token){
                dispatch(actionAuthLogin(token))
                dispatch(actionAllAds())
                dispatch(actionAboutMe())
                history.push('/')
            }
        }   
    }
//---------------for-authReducer-end-------------------------------------------------------------



//---------------for-favoriteReducer-------------------------------------------------------------
export const actionFavoriteAdd = (ad) => ({ type: 'FAVORITE_ADD', ad })
export const actionFavoriteRemove = (ad) => ({ type: 'FAVORITE_REMOVE', ad })
// export const actionFavoriteClear = (ad) => ({ type: 'FAVORITE_CLEAR', ad })
//---------------for-favoriteReducer-end---------------------------------------------------------