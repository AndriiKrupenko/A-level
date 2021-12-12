//-----------------Redux-------------------------------------------------------------------------
function createStore(reducer) {
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        if (typeof action === 'function'){ //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb() //и запускаем подписчиков
        }
    }
    
    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}
//-----------------Redux-end---------------------------------------------------------------------



//-----------------gql---------------------------------------------------------------------------
const getGQL = url =>
    (query, variables = {}) =>
        fetch(url, {
        //метод
        method: 'POST',
        headers: {
            //заголовок content-type
            "Content-Type": "application/json",
            ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} :
                                         {})
        },
        //body с ключами query и variables 
        body: JSON.stringify({query, variables})
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors && !data.data)
                throw new Error(JSON.stringify(data.errors))
            return data.data[Object.keys(data.data)[0]]
        })

const backURL = 'http://shop-roles.asmer.fs.a-level.com.ua'
    
const gql = getGQL(`${backURL}/graphql`)
//-----------------gql-end-----------------------------------------------------------------------



//-----------------delay-------------------------------------------------------------------------
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
//-----------------delay-end---------------------------------------------------------------------



//-----------------token-------------------------------------------------------------------------
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MWE3NDczZGM3NTBjMTJiYTZiYTQwOTEiLCJsb2dpbiI6IkFuZHJpaUtydXBlbmtvIiwiYWNsIjpbIjYxYTc0NzNkYzc1MGMxMmJhNmJhNDA5MSIsInVzZXIiXX0sImlhdCI6MTYzODM1OTgyMX0.TMutmosOEARPDreoFZH3LnS1iMXFQn8yZ0oYcNwaQ5s"
//-----------------token-end---------------------------------------------------------------------



//---------------promiseReducer------------------------------------------------------------------
function promiseReducer(state={}, {type, name, status, payload, error}){
    //{
    //    login: {status, payload, error}
    //    catById: {status, payload, error}
    //}
    if (type === 'PROMISE'){
        return {
            ...state,
            [name]:{status, payload, error}
        }
    }
    return state
}
//-------------promiseReducer-end----------------------------------------------------------------



//---------------for-promiseReducer--------------------------------------------------------------
// const store = createStore(promiseReducer)
// store.subscribe(() => console.log(store.getState()))

const actionPending  = name => ({type: 'PROMISE', status: 'PENDING', name})
const actionResolved = (name, payload) => ({type: 'PROMISE', status: 'RESOLVED', name, payload})
const actionRejected = (name, error) => ({type: 'PROMISE', status: 'REJECTED', name,  error})

const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name)) // 1. {delay1000: {status: 'PENDING'}}
        try{
            let payload = await promise
            dispatch(actionResolved(name, payload))
            return payload
        }
        catch(error){
            dispatch(actionRejected(name, error))
        }
    }

//+ #/orders показывает ваши бывшие заказы:
myOrders.href = '#/orders'

//сделать actionMyOrders
const actionMyOrders = () =>
    actionPromise('myOrders', gql(`
        query {
            OrderFind(query: "[{}]"){
                _id total orderGoods{
                    price count total good{
                        name 
                    }
                }
            }
        }`))

// actionOrder 
const actionOrder = () =>
    async (dispatch, getState) => {
        let {cart} = getState()
//         //магия по созданию структуры вида
//         //let orderGoods = [{good: {_id}, count}, {good: {_id}, count} .......]
//         //из структуры вида
//             //{_id1: {good, count},
//             //{_id2: {good, count}}

//         const orderGoods = Object.entries(cart)
//                             .map(([_id, {надеструктуризировать good и count}]) => ({good: {_id}, count}))
        
        const orderGoods = Object.entries(cart)
                            .map(([_id, {good, count}]) => ({good: {_id}, count}))

        // const orderGoods = Object.entries(cart).map(([_id, obj]) => {
        //     let { good, count } = obj
        //     return { good: { _id }, count }
        // })

        await dispatch(actionPromise('order', gql(`
            mutation newOrder($order:OrderInput){
                OrderUpsert(order:$order){
                    _id total
                }
            }
            `, {order: {orderGoods}})))
    }
//---------------for-promiseReducer-end----------------------------------------------------------



//---------------Decode-token--------------------------------------------------------------------
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
    //раскодировать токен:
    //выкусить середочку
    //atob
    //JSON.parse
    //на любом этапе могут быть исключения
}
//---------------Decode-token-end----------------------------------------------------------------



//---------------authReducer---------------------------------------------------------------------
function authReducer(state, {type, token}){
    if (!state) {
        if (localStorage.authToken) {
            type = 'AUTH_LOGIN'
            token = localStorage.authToken
        } else {
            return {}
        }
        //проверить localStorage.authToken на наличие
        //если есть - сделать так, что бы следующий if сработал
        //если нет - вернуть {}
    }
    if (type === 'AUTH_LOGIN') {
        let auth = jwtDecode(token)
        if (auth) {
            localStorage.authToken = token
            return { token, payload: auth }
        }
        //взять токен из action
        //попытаться его jwtDecode
        //если удалось, то:
        //сохранить токен в localStorage
        //вернуть объект вида {токен, payload: раскодированный токен}
    }
    if (type === 'AUTH_LOGOUT') {
        localStorage.authToken = ''
        return {}
        //почистить localStorage
        //вернуть пустой объект
    }

    return state
}
//---------------authReducer-end-----------------------------------------------------------------



//---------------for-authReducer-----------------------------------------------------------------
const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })

// const store = createStore(authReducer)
// console.log(store.getState()) //стартовое состояние может быть с токеном
// store.subscribe(() => console.log(store.getState()))

//проверить:
// store.dispatch(actionAuthLogin(token))
// console.log(store.getState())
//поделать store.dispatch с разными action. Скопипастить токен
//проверить перезагрузку страницы.

const actionLogin = (login, password) =>
    actionPromise('login', gql(`query login($login: String, $password: String){
        login(login:$login,
        password:$password)
}`, {login, password}))


const actionFullLogin = (login, password) =>
    async dispatch => {
        let token = await dispatch(actionLogin(login, password))
        if (token){
            dispatch(actionAuthLogin(token))
        }
    }

//const actionRegister //actionPromise
//const actionFullRegister = (login, password) => //actionRegister + actionFullLogin

const actionRegister = (login, password) =>
    actionPromise('reg', gql(`mutation reg($login: String, $password: String){
        UserUpsert(user:{login:$login,
    	password:$password,
    	nick:$login}){
            _id login
        }
}`, { login, password }))


const actionFullRegister = (login, password) =>
    async dispatch => {
        let user = await dispatch(actionRegister(login, password))
        if (user) {
            let token = await dispatch(actionLogin(login, password))
            if (token){
            dispatch(actionAuthLogin(token))
            }
        }   
    }

//+ интерфейс к этому - форму логина, регистрации, может повесить это на #/login #/register 
loginButton.href = '#/login'
regButton.href = '#/register'

//---------------for-authReducer-end-------------------------------------------------------------



//---------------cartReducer---------------------------------------------------------------------
function cartReducer(state = {}, { type, good={}, count=1}){
    //{
    //  _id1: {good, count}
    //  _id2: {good, count}
    //}
    const {_id } = good
    const types = {
        CART_ADD() {
            //как CHANGE, только если ключ раньше был, то достать из него count и добавить
            //к count из action. Если не было, достать 0 и добавить к count из action
            return {
                ...state,
                [_id]: { good, count: count + (state[_id]?.count || 0)}
            }
        },
        CART_REMOVE(){ //смочь скопировать объект и выкинуть ключ. как вариант через
                        //деструктуризацию
            let newState = { ...state }
            delete newState[_id]
            return {
                ...newState
            }            
        },
        CART_CHANGE(){
            return {
                ...state, //по аналогии с promiseReducer дописать
                    [_id]:{good, count}
            }
        },
        CART_CLEAR(){
            return {}
        },
    }

    if (type in types)
        return types[type]()


    return state
}
//---------------cartReducer-end------------------------------------------------------------------



//---------------for-cartReducer------------------------------------------------------------------
//понаписывать action
//прикрутить к товару кнопку которая делает store.dispatch(actionCartAdd(good))
const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', good, count })
const actionCartRemove = (good, count = 1) => ({ type: 'CART_REMOVE', good, count })
const actionCartChange = (good, count = 1) => ({ type: 'CART_CHANGE', good, count })
const actionCartClear = (good, count = 1) => ({ type: 'CART_CLEAR', good, count })

cartIcon.href = '#/cart'
//---------------for-cartReducer-end--------------------------------------------------------------



//---------------combineReducers-----------------------------------------------------------------
function combineReducers(reducers){
    return (state={}, action) => {
        const newState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)) {
            let newSubState = reducer(state[reducerName], action)
            if (newSubState != state[reducerName]) {
                newState[reducerName] = newSubState
            }
        }
            if (Object.keys(newState).length != 0 ) {
                return {...state, ...newState}
            } else {
                return state
        }
        //перебрать все редьюсеры
            //запустить каждый их них
            //передать при этом в него ЕГО ВЕТВЬ общего state, и action как есть
            //получить newSubState
            //если newSubState отличается от входящего, то записать newSubState в newState
        //после цикла, если newState не пуст, то вернуть {...state, ...newState}
        //иначе вернуть state
    }
}
//---------------combineReducers-end-------------------------------------------------------------



//---------------for-combineReducers-------------------------------------------------------------
const combinedReducer = combineReducers({promise: promiseReducer, auth: authReducer, cart: cartReducer})
const store = createStore(combinedReducer)
console.log(store.getState()) //{promise: {}, auth: {}}

//store.dispatch(actionPromise('delay1000', delay(1000)))//{promise: {delay1000: '''}, auth: {}}
//store.dispatch(actionAuthLogin(token))//{promise: {delay1000: '''}, auth: {token .....}}
//ПЕРЕДЕЛАТЬ ОТОБРАЖЕНИЕ с поправкой на то, что теперь промисы не в корне state а в state.promise
//---------------for-combineReducers-end---------------------------------------------------------



//-------------------rootCats--------------------------------------------------------------------
const actionRootCats = () => 
    actionPromise('rootCats', gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`))

store.dispatch(actionRootCats())

store.subscribe(() => {
    const { rootCats } = store.getState().promise
    if (rootCats?.payload){
        aside.innerHTML = ''
        for (const {_id, name} of rootCats?.payload){
            const link      = document.createElement('a')
            link.href       = `#/category/${_id}`
            link.innerText  = name
            aside.append(link)
        }
    }  
})
//-------------------rootCats-end----------------------------------------------------------------



//-------------------catById-goodById-Orders-----------------------------------------------------
const actionCatById = (_id) =>  //добавить подкатегории
    actionPromise('catById', gql(`query catById($q: String){
        CategoryFindOne(query: $q){
            subCategories {
               _id name
            }
            _id name goods {
                _id name price images {
                    url
                }
            }
        }
    }`, { q: JSON.stringify([{ _id }]) }))
    
const actionGoodById = (_id) => 
    actionPromise('goodById', gql(`query goodById($q: String){
        GoodFindOne(query:$q){
            _id name price images{
                url
            }
        }
    }`, { q: JSON.stringify([{ _id }]) }))
    

store.subscribe(() => {
    console.log(store.getState())
    const { catById, goodById, myOrders } = store.getState().promise
    const [,route, _id] = location.hash.split('/')
    if (catById?.payload && route === 'category' ){
        const {name} = catById.payload 
        main.innerHTML = `<h1>${name}</h1>` 
        // ТУТ ДОЛЖНЫ БЫТЬ ПОДКАТЕГОРИИ
        if (catById.payload.subCategories != null) {
            for (const { _id, name } of catById.payload.subCategories) {
                const link      = document.createElement('a')
                link.href       = `#/category/${_id}`
                link.innerText  = name
                main.append(link)
                const br        = document.createElement('br')
                main.append(br)
            }
        }
        for (const good of catById.payload.goods) {
            const {_id, name, price, images} = good
            const card      = document.createElement('div')
            card.innerHTML = `<h2>${name}</h2>
                              <img src="${backURL}/${images[0].url}" />
                              <strong>${price}</strong>
                              <a href="#/good/${_id}">Подробнее...</a>`
                                // ТУТ ДОЛЖНА БЫТЬ ССЫЛКА НА СТРАНИЦУ ТОВАРА
                                // ВИДА #/good/АЙДИ
            
            let addToCartButton = document.createElement('button')
            addToCartButton.innerText = "Добавить в корзину"
            addToCartButton.onclick = () => {
                store.dispatch(actionCartAdd(good))
            }
            card.append(addToCartButton)
            main.append(card)
        }
    }
    //ТУТ ДОЛЖНА БЫТЬ ПРОВЕРКА НА НАЛИЧИЕ goodById в редакс
    //и проверка на то, что сейчас в адресной строке адрес ВИДА #/good/АЙДИ
    //в таком случае очищаем main и рисуем информацию про товар с подробностями
    if (goodById?.payload && route === 'good') {
        if (goodById.payload != null) {
            const { name, price, images } = goodById.payload
            main.innerHTML = `<h1>${name}</h1>
                            <img src="${backURL}/${images[0].url}" />
                            <strong>${price}</strong>
                            <button id="buyGoodButton">Купить</button>`
            buyGoodButton.onclick = () => {
                store.dispatch(actionCartAdd(goodById.payload))
            }
        }
    }
    if (myOrders?.payload && route === 'orders') {
        if (myOrders.payload.length > 0) {
            main.innerHTML = ''
            for (let key of myOrders.payload) {
                main.innerHTML += '<hr>'
                const { _id, total, orderGoods } = key
                main.innerHTML += `<p><b>OrderID:</b> ${_id}<br><b>OrderTOTAL:</b> ${total}</p>`
                for (let position of orderGoods) {
                    main.innerHTML += `<p><b>Good:</b> ${position.good.name} <b>Count:</b> ${position.count} <b>Price:</b> ${position.price} <b>Total:</b> ${position.total}</p>`
                }  
            }
            main.innerHTML += '<hr>'
        }
    }
})
//-------------------catById-goodById-Orders-end-------------------------------------------------

    

//------------------onhashchange-----------------------------------------------------------------
window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')

    const routes = {
        category() {
            // if (!loginForm) {
            //     header.append(loginForm)
            // }
            store.dispatch(actionCatById(_id))
        },
        good() {
            //задиспатчить actionGoodById
            store.dispatch(actionGoodById(_id))
            // console.log('ТОВАРОСТРАНИЦА')
        },
        login() {
            main.innerHTML = `<div class="log-reg-form">
                            <input id='login' type="text" placeholder="Login"/><br>
                            <input id='password' type="password" placeholder="Password" /><br>
                            <a id="loginPageButton"><button>Login</button></a></div>`
            
            //отрисовка тут
            //по кнопке - store.dispatch(actionFullLogin(login, password))
            loginPageButton.onclick = () => {
                store.dispatch(actionFullLogin(login.value, password.value))
                loginForm.style.display = "none"
                logout.style.display = "block"
            }
        },
        register() {
            main.innerHTML = `<div class="log-reg-form">
                            <input id='login' type="text" placeholder="Login"/><br>
                            <input id='password' type="password" placeholder="Password" /><br>
                            <a id="regPageButton"><button>Registration</button></a></div>`
            
            //отрисовка тут
            //по кнопке - store.dispatch(actionFullRegister(login, password))
            regPageButton.onclick = () => {
                store.dispatch(actionFullRegister(login.value, password.value))
                loginForm.style.display = "none"
                logout.style.display = "block"
            }
        },
        cart() { //задиспатчить
            console.log(store.getState())
            const cart = store.getState().cart
            const [,route] = location.hash.split('/')
            if (route === 'cart') {
                main.innerHTML = ''
                let goodsInCart = document.createElement('div')
                for (let good in cart) {
            
                    let goodInCart = document.createElement('p')
                    goodInCart.setAttribute('class', 'cart')
                    goodsInCart.append(goodInCart)

                    let goodImg = document.createElement('img')
                    goodImg.setAttribute('src', `${backURL}/${cart[good].good.images[0].url}`)
                    goodInCart.append(goodImg)

                    let goodName = document.createElement('span')
                    goodName.innerHTML = `${cart[good].good.name}`
                    goodInCart.append(goodName)

                    let goodCount = document.createElement('input')
                    goodCount.setAttribute('type', 'number')
                    goodCount.setAttribute('min', '0')
                    goodCount.setAttribute('value', `${cart[good].count}`)
                    goodInCart.append(goodCount)

                    goodCount.oninput = () => {
                        store.dispatch(actionCartChange(cart[good].good, +goodCount.value))
                        // console.log(store.getState().cart)

                    }

                    let removeGood = document.createElement('button')
                    removeGood.innerText = 'Удалить'
                    goodInCart.append(removeGood)
                    
                    removeGood.onclick = () => { 
                        store.dispatch(actionCartRemove(cart[good].good))
                        window.onhashchange()
                    }

                    let hr = document.createElement('hr')
                    goodInCart.append(hr)

                }
                
                main.append(goodsInCart)
            }

            let newOrder = document.createElement('button')
            newOrder.innerText = 'Заказать'
            main.append(newOrder)

            if (Object.keys(cart).length == 0) {
                newOrder.style.display = "none"
            }

            newOrder.onclick = () => {
                store.dispatch(actionOrder())
                store.dispatch(actionCartClear())
            }
            // console.log('СДЕЛАТЬ СТРАНИЦУ С ПОЗИЦИЯМИ, полями ввода количества, картинками')
            // console.log('и кнопкой, которая store.dispatch(actionOrder())')
        },
        // dashboard() //задиспатчить 
        orders() { //задиспатчить 
            store.dispatch(actionMyOrders())
        },
    }
    if (route in routes)
        routes[route]()
}
window.onhashchange()
//------------------onhashchange-end-------------------------------------------------------------



//------------------loginForm--------------------------------------------------------------------
if (localStorage.authToken) {
    loginForm.style.display = "none"
} else {
    logout.style.display = "none"
}

logoutButton.onclick = () => {
    localStorage.authToken = ""
    loginForm.style.display = "block"
    logout.style.display = "none"
}
//------------------loginForm-end----------------------------------------------------------------



store.subscribe(() => {
    //подсчитать общее количество товаров в корзине (перебрать cart  и подсчитать общую
    //сумму count)
    //вывести это число в cartIcon
    let goodsInCart = store.getState().cart
    let allGoodsInCart = 0
    for (let key in goodsInCart) {
        allGoodsInCart += goodsInCart[key].count
    }
    // console.log(allGoodsInCart)
    cartIcon.innerText = `Товаров в корзине: ${allGoodsInCart}`
})

