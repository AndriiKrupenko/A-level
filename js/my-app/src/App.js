import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import {Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

const history = createHistory()

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



//---------------for-localStoredReducer-----------------------------------------------------------
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

    // localStorage[localStorageName]


//---------------for-localStoredReducer-end--------------------------------------------------------



const store = createStore(combineReducers({promise: promiseReducer, auth: authReducer, cart: localStoredReducer(cartReducer, 'cart')}), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
store.dispatch(actionRootCats())
store.dispatch(actionCatById('5dc458985df9d670df48cc47'))

const Logo = () =>
<Link to="/" >
    <img src={logo} className="Logo" alt="logo" />
</Link>
        
const Header = () =>
<header>
    <Logo /> 
    <CKoshik />
    <Link to="/cart" >
        <button>My Cart</button>
    </Link>
    <Link to="/login" >
        <button>Login</button>
    </Link>
    <Link to="/registration" >
        <button>Registration</button>
    </Link>
</header>

const CategoryListItem = ({_id, name}) =>
    <li>
        <Link to={`/category/${_id}`}>{name}</Link>
    </li>

  

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
    <Link to={`/good/${_id}`}>Подробнее</Link>
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
    <ul>{(goods || []).map(good => <CGoodCard good={good} />)}</ul>
  </div>

const CCategory = connect(state => ({ cat: state.promise.catById?.payload || {}}))(Category)



const LoginForm = ({onLogin}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <input type="text" style={{ backgroundColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/>
            <input type="text" style={{ backgroundColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={!(login && password)} onClick={ () => onLogin(login, password)}>Login</button>
        </>
    )
}

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm)



const RegistrationForm = ({onReg}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <input type="text" style={{ backgroundColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/>
            <input type="text" style={{ backgroundColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={!(login && password)} onClick={ () => onReg(login, password)}>Registration</button>
        </>
    )
}

const CRegistrationForm = connect(null, { onReg: actionFullRegister })(RegistrationForm)



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
          <input type='number' min="0" value={cart[goodId].count} onChange={(e) => onCartChange(cart[goodId].good, +e.target.value)} />
          <button onClick={ () => onCartRemove(cart[goodId].good)}>Удалить</button>
        </li>
      )}
  </ul>
</div>

const CCart = connect(state => ({ cart: state.cart || {}}), {onCartChange: actionCartChange, onCartRemove: actionCartRemove})(Cart)
//const CCart = connect(забрать из редакса корзину положить в пропс cart, 
                       //дать компоненту onCartChange и onCartRemove с соответствующими actionCreator)(Cart)



const PageMain = () => 
    <h1>Главная страница</h1>


    
const Page404 = () => 
    <h1>404</h1>



const PageCategory = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            {/* <h1>{_id}</h1> */}
            <CCategory />
        </>
    )
}

const CPageCategory = connect(null, { getData: actionCatById })(PageCategory)



const PageGood = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <CGoodPageCard />
        </>
    )
}

const CPageGood = connect(null, { getData: actionGoodById })(PageGood)



const GoodPageCard = ({ good: { _id, name, price, images }, onAdd }) =>
  <li className='GoodCard'>
    <h2>{name}</h2>
    {images && images[0] && images[0].url && <img src={backURL + '/' + images[0].url} />}
    <strong>{price}</strong>
    <button onClick={ () => onAdd({ _id, name, price, images })}>В корзину</button>
  </li>

const CGoodPageCard = connect(state => ({ good: state.promise.goodById?.payload || {}}), { onAdd: actionCartAdd })(GoodPageCard)



const Main = () =>
<main>
    <Aside />
    <Content>
        <Switch>
            <Redirect from="/main" to="/" />
            <Route path="/" component={PageMain} exact />
            <Route path="/category/:_id" component={CPageCategory} />
            <Route path="/good/:_id" component={CPageGood} />
            <Route path="/cart" component={CCart} />
            <Route path="/login" component={CLoginForm} />
            <Route path="/registration" component={CRegistrationForm} />
            <Route path="*" component={Page404} />
        </Switch>
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

const Dots = ({ count, active, onChange }) => { 
    let arr = []
    arr.length = count
    const newArr = Array.from(arr, (...params) => <li onClick={ () => onChange(params[1]) }></li>)
    newArr[active] = <li className='active'></li>
    return <ul>{newArr}</ul>
}

const Gallery = ({images=['https://kot-pes.com/wp-content/uploads/2018/12/post_5c249026dde11.jpg',
                          'https://bigpicture.ru/wp-content/uploads/2019/12/DmrVIH7W4AAU_90-800x533.jpg']}) => { 
    const [img, setImg] = useState(0)
    const changeImg = () => { 
        if ((img + 1) < images.length) {
            return img + 1
        } else { 
            return 0
        }
    }

    const changeImgBack = () => { 
        if (img > 0) {
            return img - 1
        } else { 
            return images.length - 1
        }
    }

    const onChange = (activeImg) => { 
        setImg(activeImg)
    }

    return (
        <>
            <img src={images[img]} alt={images.img} />
            <Dots count={images.length} active={img} onChange={onChange}/>
            <button onClick={() => setImg(changeImg)}>Вперед</button>
            <button onClick={() => setImg(changeImgBack)}>Назад</button>
        </>
    )
}

const countries = {
  "AF": "Afghanistan",
  "AX": "Åland Islands",
  "AL": "Albania",
  "DZ": "Algeria",
  "AS": "American Samoa",
  "AD": "AndorrA",
  "AO": "Angola",
  "AI": "Anguilla",
  "AQ": "Antarctica",
  "AG": "Antigua and Barbuda",
  "AR": "Argentina",
  "AM": "Armenia",
  "AW": "Aruba",
  "AU": "Australia",
  "AT": "Austria",
  "AZ": "Azerbaijan",
  "BS": "Bahamas",
  "BH": "Bahrain",
  "BD": "Bangladesh",
  "BB": "Barbados",
  "BY": "Belarus",
  "BE": "Belgium",
  "BZ": "Belize",
  "BJ": "Benin",
  "BM": "Bermuda",
  "BT": "Bhutan",
  "BO": "Bolivia",
  "BA": "Bosnia and Herzegovina",
  "BW": "Botswana",
  "BV": "Bouvet Island",
  "BR": "Brazil",
  "IO": "British Indian Ocean Territory",
  "BN": "Brunei Darussalam",
  "BG": "Bulgaria",
  "BF": "Burkina Faso",
  "BI": "Burundi",
  "KH": "Cambodia",
  "CM": "Cameroon",
  "CA": "Canada",
  "CV": "Cape Verde",
  "KY": "Cayman Islands",
  "CF": "Central African Republic",
  "TD": "Chad",
  "CL": "Chile",
  "CN": "China",
  "CX": "Christmas Island",
  "CC": "Cocos (Keeling) Islands",
  "CO": "Colombia",
  "KM": "Comoros",
  "CG": "Congo",
  "CD": "Congo, Democratic Republic",
  "CK": "Cook Islands",
  "CR": "Costa Rica",
  "CI": "Cote D\"Ivoire",
  "HR": "Croatia",
  "CU": "Cuba",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DK": "Denmark",
  "DJ": "Djibouti",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "EC": "Ecuador",
  "EG": "Egypt",
  "SV": "El Salvador",
  "GQ": "Equatorial Guinea",
  "ER": "Eritrea",
  "EE": "Estonia",
  "ET": "Ethiopia",
  "FK": "Falkland Islands (Malvinas)",
  "FO": "Faroe Islands",
  "FJ": "Fiji",
  "FI": "Finland",
  "FR": "France",
  "GF": "French Guiana",
  "PF": "French Polynesia",
  "TF": "French Southern Territories",
  "GA": "Gabon",
  "GM": "Gambia",
  "GE": "Georgia",
  "DE": "Germany",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GR": "Greece",
  "GL": "Greenland",
  "GD": "Grenada",
  "GP": "Guadeloupe",
  "GU": "Guam",
  "GT": "Guatemala",
  "GG": "Guernsey",
  "GN": "Guinea",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HT": "Haiti",
  "HM": "Heard Island and Mcdonald Islands",
  "VA": "Holy See (Vatican City State)",
  "HN": "Honduras",
  "HK": "Hong Kong",
  "HU": "Hungary",
  "IS": "Iceland",
  "IN": "India",
  "ID": "Indonesia",
  "IR": "Iran",
  "IQ": "Iraq",
  "IE": "Ireland",
  "IM": "Isle of Man",
  "IL": "Israel",
  "IT": "Italy",
  "JM": "Jamaica",
  "JP": "Japan",
  "JE": "Jersey",
  "JO": "Jordan",
  "KZ": "Kazakhstan",
  "KE": "Kenya",
  "KI": "Kiribati",
  "KP": "Korea (North)",
  "KR": "Korea (South)",
  "XK": "Kosovo",
  "KW": "Kuwait",
  "KG": "Kyrgyzstan",
  "LA": "Laos",
  "LV": "Latvia",
  "LB": "Lebanon",
  "LS": "Lesotho",
  "LR": "Liberia",
  "LY": "Libyan Arab Jamahiriya",
  "LI": "Liechtenstein",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MO": "Macao",
  "MK": "Macedonia",
  "MG": "Madagascar",
  "MW": "Malawi",
  "MY": "Malaysia",
  "MV": "Maldives",
  "ML": "Mali",
  "MT": "Malta",
  "MH": "Marshall Islands",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MU": "Mauritius",
  "YT": "Mayotte",
  "MX": "Mexico",
  "FM": "Micronesia",
  "MD": "Moldova",
  "MC": "Monaco",
  "MN": "Mongolia",
  "MS": "Montserrat",
  "MA": "Morocco",
  "MZ": "Mozambique",
  "MM": "Myanmar",
  "NA": "Namibia",
  "NR": "Nauru",
  "NP": "Nepal",
  "NL": "Netherlands",
  "AN": "Netherlands Antilles",
  "NC": "New Caledonia",
  "NZ": "New Zealand",
  "NI": "Nicaragua",
  "NE": "Niger",
  "NG": "Nigeria",
  "NU": "Niue",
  "NF": "Norfolk Island",
  "MP": "Northern Mariana Islands",
  "NO": "Norway",
  "OM": "Oman",
  "PK": "Pakistan",
  "PW": "Palau",
  "PS": "Palestinian Territory, Occupied",
  "PA": "Panama",
  "PG": "Papua New Guinea",
  "PY": "Paraguay",
  "PE": "Peru",
  "PH": "Philippines",
  "PN": "Pitcairn",
  "PL": "Poland",
  "PT": "Portugal",
  "PR": "Puerto Rico",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RU": "Russian Federation",
  "RW": "Rwanda",
  "SH": "Saint Helena",
  "KN": "Saint Kitts and Nevis",
  "LC": "Saint Lucia",
  "PM": "Saint Pierre and Miquelon",
  "VC": "Saint Vincent and the Grenadines",
  "WS": "Samoa",
  "SM": "San Marino",
  "ST": "Sao Tome and Principe",
  "SA": "Saudi Arabia",
  "SN": "Senegal",
  "RS": "Serbia",
  "ME": "Montenegro",
  "SC": "Seychelles",
  "SL": "Sierra Leone",
  "SG": "Singapore",
  "SK": "Slovakia",
  "SI": "Slovenia",
  "SB": "Solomon Islands",
  "SO": "Somalia",
  "ZA": "South Africa",
  "GS": "South Georgia and the South Sandwich Islands",
  "ES": "Spain",
  "LK": "Sri Lanka",
  "SD": "Sudan",
  "SR": "Suriname",
  "SJ": "Svalbard and Jan Mayen",
  "SZ": "Swaziland",
  "SE": "Sweden",
  "CH": "Switzerland",
  "SY": "Syrian Arab Republic",
  "TW": "Taiwan, Province of China",
  "TJ": "Tajikistan",
  "TZ": "Tanzania",
  "TH": "Thailand",
  "TL": "Timor-Leste",
  "TG": "Togo",
  "TK": "Tokelau",
  "TO": "Tonga",
  "TT": "Trinidad and Tobago",
  "TN": "Tunisia",
  "TR": "Turkey",
  "TM": "Turkmenistan",
  "TC": "Turks and Caicos Islands",
  "TV": "Tuvalu",
  "UG": "Uganda",
  "UA": "Ukraine",
  "AE": "United Arab Emirates",
  "GB": "United Kingdom",
  "US": "United States",
  "UM": "United States Minor Outlying Islands",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VU": "Vanuatu",
  "VE": "Venezuela",
  "VN": "Viet Nam",
  "VG": "Virgin Islands, British",
  "VI": "Virgin Islands, U.S.",
  "WF": "Wallis and Futuna",
  "EH": "Western Sahara",
  "YE": "Yemen",
  "ZM": "Zambia",
  "ZW": "Zimbabwe"
}

const MySelect = ({ options=countries, value="YE", onChange}) => { 

    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            {Object.keys(options).map(country => 
                <option value={country}>{options[country]}</option>)
            }
        </select>
    )
}

const PhoneBookEntry = ({ data: { name, phone } = { name: "", phone: "" },
                                onChange,  //по изменению
                                onMoveUp,  //сдвинуть вверх
                                onMoveDown,//сдвинуть вниз
                                onDelete,  //удалить этот
                                onAdd}) => { //добавить под ним еще один
    return (
        <>
            {/* //тут отдавать в наружный onChange такой же объект как и data */}
            <input value={name} />
            {/* //тут отдавать в наружный onChange такой же объект как и data */}
            <input value={phone} />
            <button onClick={onMoveUp}>^</button>
            <button onClick={onMoveDown}>v</button>
            <button onClick={onDelete}>x</button>
            <button onClick={onAdd}>+</button>
            <br />
        </>
    )
}

const defaultPeople = [{name: "John", phone: "102"}, {name: "Paul", phone: "103"}]

const PhoneBook = ({ people = defaultPeople,
                     onSave }) => { 
    const [ppl, setPpl] = useState(people)
    // const [keys, setKeys] = useState(people.map(() => Math.random()))
    // const keys  = useRef(people.map(() => Math.random()))
    //должно меняться соответственно элементам списка - сдвигаться удаляться и тп
    useEffect(() => {
        setPpl(people)
        //тут и keys обновить
        // setKeys(people.map(() => Math.random()))
    }, [people])

     //обеспечить для PhoneBookEntry:
    //   onChange, onMoveUp, onMoveDown, onDelete
    // const onChange = (newData, i) => { //{name: 'НАМЕ', phone: 'НУМБЕР'}
        //создаем новый массив ppl на базе старого, заменяем один элемент и делаем setPpl
        //ничего НЕ ДЕЛАЕМ с keys
    // }
    // const onDelete = (i) => { //фильтрует ppl и keys удаляя i-ый элемент
    // }
    // console.log(keys, ppl)
    console.log(ppl)

    return (
        <>
            {/* <button onClick={}>+</button> //ДОБАВЛЯЕТ В НАЧАЛО СПИСКА */}
            <button>+</button>
            <div className='PhoneBook'>
                {/* //по любым изменениям обновляем массив целиком на базе старого
                //меняя один или несколько элементов */}
                {ppl.map(data => <PhoneBookEntry data={data} key={Math.random()}  //не забудьте keys
                                                //  onChange={data => onChange(data, И)}
                                                //  onDelete={() => onDelete(i)}
                    
                                                 />)}
            </div>
            <button onClick={() => onSave(ppl)}>Save</button>
            <br />
        </>
        
    )
}


function App() {
    const [country, setCountry] = useState('ZW')
    // console.log(country)
  return (
    <Router history={history}>
          <Provider store={store}>
              <PhoneBook onSave={ppl => console.log(ppl)}/>
              <Gallery />
              <MySelect value={country} onChange={ newCountry => setCountry(newCountry)}/>
            <div className="App">
                <Header />
                <Main />
                <Footer/>
            </div>
        </Provider>
    </Router>
  );
}

export default App;
