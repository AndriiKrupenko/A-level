function createStore(reducer){
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

function cartReducer(state={}, {type, good={}, count=1}){
    //{_id1: {good, count},
    //_id2: {good, count}}


    const {_id} =  good

    const types = {
        CART_ADD(){ //берет старую позицию, и добавляет count к текущему количеству.
                    //если позиции нет - то добавляет к 0 (т. е. в первый раз будет count)
            //
            //
            count       = +count
            if (!count)
                return state
            return {
                ...state
            }
        },
        CART_CHANGE(){ //тупо меняет позицию
            count       = +count
            if (!count)
                return state
            return {
                ...state,
                _id
            }
        },
        CART_REMOVE(){ //надо как-то создать объект без ключа

        },
        CART_CLEAR(){ //самое простое
            return {}
        }
    }
    if (type in types){
        return types[type]()
    }

    return state
}





const token = 'ey....'

//написать функцию jwtDecode = token => ({})
//выкусить из токена серединку
//сделать base64 декод (atob)
//с результатом сделать JSON.parse

function authReducer(state, {type, token}){
    if (!state){
        //если в localStorage токен есть, просимулировать AUTH_LOGIN (сделать так, что бы 
        //следующий if сработал c токеном из localStorage)
        //
        //иначе вернуть {}
    }
    if (type === 'AUTH_LOGIN'){
        //сохранить в localStorage token
        //let payload = jwtDecode(token)
        //если payload не объект то вернуть {}
        //вернуть {token, payload}
    }
    if (type === 'AUTH_LOGOUT'){
        //удалить из localStorage токен
        //вернуть {}
    }

    return state
}

const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout =    () => ({type: 'AUTH_LOGOUT'})

//сделать с этим createStore
//console.log(store.getState()) //стартовое состояние
//store.subscribe(() => console.log(store.getState()))
//проверить

function combineReducers(reducers){
    return (state={}, action) => {
        // const newState = {}
        // for (const [reducerName, reducer] of Object.entries(reducers))
        //перебрать все редьюсеры
            //запустить каждый их них
            //передать при этом в него ЕГО ВЕТВЬ общего state, и action как есть
            //получить newSubState
            //если newSubState отличается от входящего, то записать newSubState в newState
        //после цикла, если newState не пуст, то вернуть {...state, ...newState}
        //иначе вернуть state
    }
}
const combinedReducer = combineReducers({promise: promiseReducer, auth: authReducer})
const store = createStore(combinedReducer)
console.log(store.getState()) //{promise: {}, auth: {}}

//store.dispatch(actionPromise('delay1000', delay(1000)))//{promise: {delay1000: '''}, auth: {}}
//store.dispatch(actionAuthLogin(token))//{promise: {delay1000: '''}, auth: {token .....}}
//
//ПЕРЕДЕЛАТЬ ОТОБРАЖЕНИЕ с поправкой на то, что теперь промисы не в корне state а в state.promise
const actionLogin = (login, password) =>
    actionPromise('login', gql(`ЗАПРОС НА ЛОГИН`, {login ,password}))


const actionFullLogin = (login, password) =>
    async dispatch => {
        let token = await dispatch(actionLogin(login, password))
        if (token){
            dispatch(actionAuthLogin(token))
        }
    }
//const actionRegister //actionPromise
//const actionFullRegister = (login, password) => //actionRegister + actionFullLogin
//+ интерфейс к этому - форму логина, регистрации, может повесить это на #/login #/register 
//+ #/orders показывает ваши бывшие заказы:
    //сделать actionMyOrders
    //



//function promiseReducer(state={}, {type, name, status, payload, error}){
    ////{
    ////    login: {status, payload, error}
    ////    catById: {status, payload, error}
    ////}
    //if (type === 'PROMISE'){
        //return {
            //...state,
            //[name]:{status, payload, error}
        //}
    //}
    //return state
//}

//const store = createStore(promiseReducer)
//store.subscribe(() => console.log(store.getState()))

//const actionPending  = name => ({type: 'PROMISE', status: 'PENDING', name})
//const actionResolved = (name, payload) => ({type: 'PROMISE', status: 'RESOLVED', name, payload})
//const actionRejected = (name, error) => ({type: 'PROMISE', status: 'REJECTED', name,  error})

//const actionPromise = (name, promise) =>
    //async dispatch => {
        //dispatch(actionPending(name)) // 1. {delay1000: {status: 'PENDING'}}
        //try{
            //let payload = await promise
            //dispatch(actionResolved(name, payload))
            //return payload
        //}
        //catch(error){
            //dispatch(actionRejected(name, error))
        //}
    //}

//const getGQL = url =>
    //(query, variables = {}) =>
        //fetch(url, {
        ////метод
        //method: 'POST',
        //headers: {
            ////заголовок content-type
            //"Content-Type": "application/json",
            //...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} :
                                         //{})
        //},
        ////body с ключами query и variables 
        //body: JSON.stringify({query, variables})
        //})
        //.then(res => res.json())
        //.then(data => {
            //if (data.errors && !data.data)
                //throw new Error(JSON.stringify(data.errors))
            //return data.data[Object.keys(data.data)[0]]
        //})

//const backURL = 'http://shop-roles.asmer.fs.a-level.com.ua'
    
//const gql = getGQL(`${backURL}/graphql`)

//const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

//const actionRootCats = () => 
    //actionPromise('rootCats', gql(`query {
        //CategoryFind(query: "[{\\"parent\\":null}]"){
            //_id name
        //}
    //}`))
//
const actionOrder = () =>
    async (dispatch, getState) => {
        // let {cart} = getState()
        // //магия по созданию структуры вида
        // //let orderGoods = [{good: {_id}, count}, {good: {_id}, count} .......]
        // //из структуры вида
        //     //{_id1: {good, count},
        //     //_id2: {good, count}}
        // const orderGoods = Object.entries(cart)
        //                     .map(([_id, {надеструктуризировать и count}]) => ({good: {_id}, count}))

        // await dispatch(actionPromise('order', gql(`
        //             mutation newOrder($order:OrderInput){
        //               OrderUpsert(order:$order)
        //                 { _id total 	}
        //             }
        //     `, {order: {orderGoods}}))
    }

//const actionCatById = (_id) =>  //добавить подкатегории
    //actionPromise('catById', gql(`query catById($q: String){
        //CategoryFindOne(query: $q){
            //_id name goods {
                //_id name price images {
                    //url
                //}
            //}
        //}
    //}`, {q: JSON.stringify([{_id}])}))

//store.dispatch(actionRootCats())

//store.subscribe(() => {
    //const {rootCats} = store.getState()
    //if (rootCats?.payload){
        //aside.innerHTML = ''
        //for (const {_id, name} of rootCats?.payload){
            //const link      = document.createElement('a')
            //link.href       = `#/category/${_id}`
            //link.innerText  = name
            //aside.append(link)
        //}
    //}
//})

window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')

    const routes = {
        category(){
            store.dispatch(actionCatById(_id))
        },
        good(){ //задиспатчить actionGoodById
            console.log('ТОВАРОСТРАНИЦА')

        },
        login(){ //задиспатчить actionGoodById
            console.log('ЛОГИН')
        },
        register(){ //задиспатчить actionGoodById
            console.log('РЕГА')
        },
        cart(){ //задиспатчить actionGoodById
            console.log('СДЕЛАТЬ СТРАНИЦУ С ПОЗИЦИЯМИ, полями ввода количества, картинками')
            console.log('и кнопкой, которая store.dispatch(actionOrder())')
        },
        dashboard(){ //задиспатчить actionGoodById
            console.log('СТОРЕ ДИСПАТЧ ПРОЧИТАТЬ БЫВШИЕ ЗАКАЗЫ')
        },
    }
    if (route in routes)
        routes[route]()
}
window.onhashchange()


store.subscribe(() => {
    const {catById} = store.getState()
    const [,route, _id] = location.hash.split('/')
    if (catById?.payload && route === 'category'){
        const {name} = catById.payload 
        main.innerHTML = `<h1>${name}</h1> ТУТ ДОЛЖНЫ БЫТЬ ПОДКАТЕГОРИИ`
        for (const good of catById.payload.goods){
            const {_id, name, price, images} = good
            const card      = document.createElement('div')
            card.innerHTML = `<h2>${name}</h2>
                              <img src="${backURL}/${images[0].url}" />
                              <strong>${price}</strong>
                              ТУТ ДОЛЖНА БЫТЬ ССЫЛКА НА СТРАНИЦУ ТОВАРА
                              ВИДА #/good/АЙДИ
                                `
            //создать кнопку 'добавить в корзину' через createElement
            //на onclick повестить обработчик который store.dispatch(actionCartAdd(good))
            //card.append(кнопка)
            main.append(card)
        }
    }
})

store.subscribe(() => {
    //подсчитать общее количество товаров в корзине (перебрать cart  и подсчитать общую
    //сумму count)
    //вывести это число в cartIcon
})

//store.subscribe(() => {
    ////ТУТ ДОЛЖНА БЫТЬ ПРОВЕРКА НА НАЛИЧИЕ goodById в редакс
    ////и проверка на то, что сейчас в адресной строке адрес ВИДА #/good/АЙДИ
    ////в таком случае очищаем main и рисуем информацию про товар с подробностями
//})


////store.dispatch(actionPromise('delay1000', delay(1000)))
////store.dispatch(actionPromise('delay2000', delay(2000)))
////store.dispatch(actionPromise('failedfetch', fetch('https://swapi.dev/api/people/1/')
  ////.then(res => res.json())))

