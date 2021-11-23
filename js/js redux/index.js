function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
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

function reducer(state, {type, ШО, СКОКА, БАБЛО}){ //объект action деструктуризируется на три переменных
    if (!state){ //начальная уборка в ларьке:
        return {
            пиво: {count: 100, price: 30},
            чипсы: {count: 100, price: 25},
            сиги: {count: 100, price: 50},
            касса: 0, //при покупках увеличивается
        }
    }
    if (type === 'КУПИТЬ'){ //если тип action - КУПИТЬ, то:
        //проверить на:
        //наличие товара как такового (есть ли ключ в объекте)
        //количество денег в action
        //наличие нужного количества товара.
        //и только при соблюдении этих условий обновлять state. 
        
        if (state[ШО].count >= СКОКА && БАБЛО >= СКОКА*state[ШО].price) {
            return {
                ...state, //берем все что было из ассортимента
                [ШО]: {
                    count: state[ШО].count - СКОКА,
                    price: state[ШО].price
                }, //и уменьшаем то, что покупается на количество
                касса: state.касса + БАБЛО
            }  
        }
    }
    return state //если мы не поняли, что от нас просят в `action` - оставляем все как есть
}

const store = createStore(reducer)

for (let key in store.getState()) {
    if (key != 'касса') {
        let option = document.createElement('option')
        option.innerText = key
        goods.append(option)
    }
}
//надо бы напилить цикл, который в select напихивает ассортимент. 
//возможно, если вы собираетесь выводить (и обновлять) количество,
//это надо делать где в subscribe, иначе оно не будет обновлять количество

// const купи = (ШО, СКОКА) => ({type: 'КУПИТЬ', ШО, СКОКА})

buy.onclick = () => {
    //достает выбранный товар и количество из DOM
   store.dispatch({type: 'КУПИТЬ', ШО: goods.value, СКОКА: quantity.value, БАБЛО: Number(amount.value)})
}

//запомнит функцию во внутреннем массиве cbs. 
//она будет запущена при любом успешном dispatch 
const unsubscribe = store.subscribe(() => console.log(store.getState())) 

//setTimeout(unsubscribe, 10000) //отпишемся через 10 секунд, например

//происходит запуск редьюсера, который создает новый state. 
//dispatch запускает всех подписчиков из массива cbs

function smth() {
    const result = document.createElement('table')
    shop.append(result)

    function updateResult() {
        result.innerText = ''
        for (let key in store.getState()) {
            if (key != 'касса') {
                let tr = document.createElement('tr')
                result.append(tr)
                let th = document.createElement('th')
                tr.append(th)
                th.innerText = key
                let td = document.createElement('td')
                tr.append(td)
                td.innerText = `${store.getState()[key].count}`
            } else {
                let tr = document.createElement('tr')
                result.append(tr)
                let th = document.createElement('th')
                tr.append(th)
                let spanTh = document.createElement('span')
                th.append(spanTh)
                spanTh.style.color = 'red'
                spanTh.innerText = key
                let td = document.createElement('td')
                tr.append(td)
                let span = document.createElement('span')
                td.append(span)
                span.style.color = 'red'
                span.innerText = `${store.getState()[key]}`
            }
        }
    }

    store.subscribe(() => updateResult())
    updateResult()
}

smth()
// smth()

// setTimeout(() => store.dispatch({type: 'КУПИТЬ', ШО: 'пиво', СКОКА: 3}), 5000)