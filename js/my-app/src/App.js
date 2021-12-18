import logo from './logo.svg';
import './App.scss';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';


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

const actionOrder = () =>
    async (dispatch, getState) => {
        let {cart} = getState()
        
        const orderGoods = Object.entries(cart)
                            .map(([_id, {good, count}]) => ({good: {_id}, count}))

        await dispatch(actionPromise('order', gql(`
            mutation newOrder($order:OrderInput){
                OrderUpsert(order:$order){
                    _id total
                }
            }
            `, {order: {orderGoods}})))
    }

const actionRootCats = () => 
    actionPromise('rootCats', gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`))

const actionCatById = (_id) => 
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
//---------------for-promiseReducer-end----------------------------------------------------------



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
const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', good, count })
const actionCartRemove = (good, count = 1) => ({ type: 'CART_REMOVE', good, count })
const actionCartChange = (good, count = 1) => ({ type: 'CART_CHANGE', good, count })
const actionCartClear = (good, count = 1) => ({ type: 'CART_CLEAR', good, count })
//---------------for-cartReducer-end--------------------------------------------------------------



const store = createStore(combineReducers({promise: promiseReducer, auth: authReducer, cart: cartReducer}), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
store.dispatch(actionRootCats())
store.dispatch(actionCatById('5dc458985df9d670df48cc47'))

const Logo = () =>
<img src={logo} className="Logo" alt="logo" />

const Header = () =>
<header>
    <Logo /> 
    <CKoshik />
</header>

const CategoryListItem = ({_id, name}) =>
  <li><a href={`#/category/${_id}`}>{name}</a></li>

  

const defaultCats = [
      {
        "_id": "5dc49f4d5df9d670df48cc64",
        "name": "Airconditions"
      },
      {
        "_id": "5dc458985df9d670df48cc47",
        "name": "     Smartphones"
      },
      {
        "_id": "5dc4b2553f23b553bf3540fc",
        "name": "Холодильники"
      }]

const CategoryList = ({ cats = defaultCats }) =>
  <ul>
    {cats.map((item) => <CategoryListItem {...item}/> )}
    {/* {Math.random() > 0.5 && <button>Test</button>} */}
    {/* {[<CategoryListItem _id={cats[0]._id} name={cats[0].name} />,
    <CategoryListItem _id={cats[1]._id} name={cats[1].name} />,
    <CategoryListItem _id={cats[2]._id} name={cats[2].name}/>]} */}
  </ul>

const CCategoryList = connect(state => ({cats: state.promise.rootCats?.payload || []}))(CategoryList)



const Aside = () =>
<aside>
    {/* <CategoryList />   */}
    <CCategoryList />
</aside>



const GoodCard = ({ good: { _id, name, price, images }, onAdd }) =>
  <li className='GoodCard'>
    <h2>{name}</h2>
    {images && images[0] && images[0].url && <img src={backURL + '/' + images[0].url} />}
    <strong>{price}</strong>
    <button onClick={ () => onAdd({ _id, name, price, images })}>+</button>
  </li>

const CGoodCard = connect(null, {onAdd: actionCartAdd})(GoodCard)



const Koshik = ({cart}) => {
    let goodsInCart = cart
    let allGoodsInCart = 0
    for (let key in goodsInCart) {
        allGoodsInCart += goodsInCart[key].count
    }
  return (
      <h2>{allGoodsInCart}</h2>
    )
}

const CKoshik = connect(({ cart }) => ({cart}))(Koshik)



const Category = ({ cat: { name, goods=[] }= { } }) => 
  <div className='Category'>
    <h1>{name}</h1>
    <ul>{goods.map(good => <CGoodCard good={good} />)}</ul>
  </div>

const CCategory = connect(state => ({ cat: state.promise.catById?.payload || {}}))(Category)



// const CartListItem = ({_id, name}) =>
//   <li>{name}</li>

let cartItemValue

const getInputValue = (e) => {
  cartItemValue = e.target.value
  return cartItemValue
}

const Cart = ({ cart, onCartChange, onCartRemove }) =>
<div className='Cart'> 
    {/* {` нарисовать страницу корзины , по изменению в input <input onChange={() => onCartChange(...)}
    по кнопке удалить <button onClick={() => onCartRemove(....)}`}
    ТУТ БУДЕТ КОРЗИНА */}
    <ul>
      <h1>My Cart</h1>
      {Object.keys(cart).map(goodId => 
        <li>
          {/* {cart[goodId].good.images && cart[goodId].good.images[0] && cart[goodId].good.images[0].url && <img src={backURL + '/' + cart[goodId].good.images[0].url} />} */}
          {<img src={backURL + '/' + cart[goodId].good.images[0].url} />}
          {cart[goodId].good.name}
          <input type='number' min="0" value={cart[goodId].count} onInput={getInputValue} onChange={() => onCartChange(cart[goodId].good, +cartItemValue)} />
          <button onClick={ () => onCartRemove(cart[goodId].good)}>Удалить</button>
        </li>
      )}
  </ul>
</div>

const CCart = connect(state => ({ cart: state.cart || {}}), {onCartChange: actionCartChange, onCartRemove: actionCartRemove})(Cart)
//const CCart = connect(забрать из редакса корзину положить в пропс cart, 
                       //дать компоненту onCartChange и onCartRemove с соответствующими actionCreator)(Cart)

                       

const Main = () =>
<main>
    <Aside />
    <Content>
        {/* <Category cat={{name: 'ЗАГЛУШКА'}} /> */}
        <CCategory />
        {/* ТУТ ДЛОЖЕН бЫТЬ ЦКАРТ */}
        <CCart />
        {/* <Cart /> */}
    </Content>
</main>

const Content = ({children}) =>
  <div className="Content">
    {children}
  </div>

const Footer = () =>
<footer>
    <Logo />  
</footer>

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
