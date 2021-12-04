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

const store = createStore(promiseReducer)
store.subscribe(() => console.log(store.getState()))

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

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

const actionRootCats = () => 
    actionPromise('rootCats', gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`))

const actionCatById = (_id) =>  //добавить подкатегории
    actionPromise('catById', gql(`query catById($q: String){
        CategoryFindOne(query: $q){
            _id name goods {
                _id name price images {
                    url
                }
            }
        }
    }`, {q: JSON.stringify([{_id}])}))

store.dispatch(actionRootCats())

store.subscribe(() => {
    const {rootCats} = store.getState()
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

window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')

    const routes = {
        category(){
            store.dispatch(actionCatById(_id))
        },
        good(){ //задиспатчить actionGoodById
            console.log('ТОВАРОСТРАНИЦА')

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
        for (const {_id, name, price, images} of catById.payload.goods){
            const card      = document.createElement('div')
            card.innerHTML = `<h2>${name}</h2>
                              <img src="${backURL}/${images[0].url}" />
                              <strong>${price}</strong>
                              ТУТ ДОЛЖНА БЫТЬ ССЫЛКА НА СТРАНИЦУ ТОВАРА
                              ВИДА #/good/АЙДИ
                                `
            main.append(card)
        }
    }
})

store.subscribe(() => {
    //ТУТ ДОЛЖНА БЫТЬ ПРОВЕРКА НА НАЛИЧИЕ goodById в редакс
    //и проверка на то, что сейчас в адресной строке адрес ВИДА #/good/АЙДИ
    //в таком случае очищаем main и рисуем информацию про товар с подробностями
})


//store.dispatch(actionPromise('delay1000', delay(1000)))
//store.dispatch(actionPromise('delay2000', delay(2000)))
//store.dispatch(actionPromise('failedfetch', fetch('https://swapi.dev/api/people/1/')
  //.then(res => res.json())))

