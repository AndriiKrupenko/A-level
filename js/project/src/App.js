import { useState, useEffect } from 'react';
import logo from './logo.png';
import noImg from './no-img.png';
import './App.scss';
import store from './reducers';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { actionFullLogin } from "./actions"
import { actionFullRegister } from "./actions"
import { actionAdById } from "./actions"
import { actionAllAds } from "./actions"
import { actionAuthLogout } from "./actions"
// import {actionSearch } from './actions';

const history = createBrowserHistory()


//-----------------gql---------------------------------------------------------------------------
// const getGQL = url =>
//     (query, variables = {}) =>
//         fetch(url, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} :
//                                          {})
//         },
//         body: JSON.stringify({query, variables})
//         })
//         .then(res => res.json())
//         .then(data => console.log(data))
//         // .then(data => {
//         //     if (data.errors && !data.data)
//         //         throw new Error(JSON.stringify(data.errors))
//         //     return data.data[Object.keys(data.data)[0]]
//         // })

// const backURL = 'http://marketplace.asmer.fs.a-level.com.ua'
    
// const gql = getGQL(`${backURL}/graphql`) 

// gql(`query users{
//   UserFind(query: "[{}]") {
//     _id,
//     login
//   }
// }`)

// gql(`query userById($query: String){
//         UserFindOne(query:$query){
//             login
// 				}
// }`, {query: JSON.stringify([
//     { _id: "61cd89f193fef92ba93d857e" },
//  // { skip: [100] } 
//     ])
// })

// gql(`query adById($query: String){
//         AdFindOne(query:$query){
//             title, 
//             description,
//             price,
//             images {
//               url
//             }
// 				}
// }`, {query: JSON.stringify([
//     { _id: "5dc9c9a879064d79bb6ba069" },
//  // { skip: [100] } 
//     ])
// })

// gql(`query ads{
//   AdFind(query: "[{}]") {
//     _id, 
//     owner {
//       login
//     },
//     images {
//       url
//     },
//     title,
//     description
//   }
// }`)

// gql(`query userByLogin($query: String){
//         UserFindOne(query:$query){
//             login,
//             _id
// 				}
// }`, {query: JSON.stringify([
//     { login: "AndriiKrupenko" },
//  // { skip: [100] } 
//     ])
// })

// mutation reg($login: String!, $password: String!){
//   createUser(login:$login, password:$password){
//     login _id
//   }
// }

// query log($login: String!, $password: String!){
//   login(login:$login,
//   password:$password)
// }

//-----------------gql-end-----------------------------------------------------------------------

// console.log(store.getState())
// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsia…I1Mn0.BO16sGA2Go9dW8heBmDPUzk0xavV4PE8z7j02KlC0Rk'

const Logo = () =>
<Link to="/" >
    <div><img src={logo} className="Logo" alt="logo" /></div>
</Link>

const Header = () =>
  <header>
    <div>
      <Logo /> 
    </div>
    <div className='logReg'>
      {localStorage.authToken ?
        <Link to="/" >
          {/* <button onClick={() => { localStorage.authToken = "" }}>Logout</button> */}
          <button onClick={() => store.dispatch(actionAuthLogout())}>Logout</button>
        </Link> : 
        <>
          <Link to="/login" >
            <button>Login</button>
          </Link>
          <Link to="/registration" >
            <button>Registration</button>
          </Link>
        </>
      }
    </div>
 </header>

const Ad = ({ _id, title, images, description, owner }) =>
  <li>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <img src={'http://marketplace.asmer.fs.a-level.com.ua/' + images[0].url} alt='adImg' /> : <img src={noImg} alt='noImg' />}
      </Link>
      <div>
        <Link to={`/ad/${_id}`}>
            <h3>{title ? title : "unnamed"}</h3>
        </Link>
        {/* <span>{description ? description : "description none"}</span> */}
        <h4>Автор: {owner.login}</h4>
      </div>
  </li>

const AllAds = ({ ads }) =>
  <ul>
    {ads.map((item) => <Ad {...item} key={Math.random()}/> )}
  </ul>

const CAllAds = connect(state => ({ads: state.promiseReducer.allAds?.payload || []}))(AllAds)

const PageMain = () => 
    <>
      <h1>Объявления</h1>
      <CAllAds />
    </>


const AdPage = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <СAdPageCard />
        </>
    )
}

const CAdPage = connect(null, { getData: actionAdById })(AdPage)

const AdPageCard = ({ ad: { _id, title, images, description, price, owner, createdAt, address, tags, comments } }) => 
    <div className='adPage'>
      <div>
        {images && images[0] && images[0].url ? <img src={'http://marketplace.asmer.fs.a-level.com.ua/' + images[0].url} alt='adImg' /> : <img src={noImg} alt='noImg' />}
      </div>
      <div>
        <h3>{title ? title : "Unnamed"}</h3>
        <p><strong>Price: </strong>{price ? price : "No price"}</p>
        <p><strong>ID: </strong>{_id}</p>
        <p><strong>Description: </strong>{description ? description : "Description none"}</p>
        <p><strong>Created: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}</p>
        <p><strong>Address: </strong>{address ? address : "No address"}</p>
        {/* <p>{tags}</p> */}
        {/* <h6>{owner.login}</h6> */}
        {/* <p>{comments}</p> */}
      </div>
      </div>
         

const СAdPageCard = connect(state => ({ad: state.promiseReducer.adById?.payload || []}))(AdPageCard)

const LoginForm = ({onLogin}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='loginRegistrationForm'>
            <h3>Login form</h3>
            <p><input type="text" placeholder="login" style={{ borderColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/></p>
            <p><input type="text" placeholder="password" style={{ borderColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/></p>
            <p>
              <button disabled={!(login && password)} onClick={() => { 
                onLogin(login, password)
                  .then(() => store.dispatch(actionAllAds()))
                  
              
                // history.push('/')
                // localStorage.authToken && store.dispatch(actionAllAds())
            }}>Login</button>&nbsp;
              <Link to="/registration" >
                <button>Registration &gt;&gt;</button>
              </Link>
            </p>
        </div>
    )
}

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm)


const RegistrationForm = ({onReg}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='loginRegistrationForm'>
            <h3>Registration form</h3>
            <p><input type="text" placeholder="login" style={{ borderColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/></p>
            <p><input type="text" placeholder="password" style={{ borderColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/></p>
            <p>
              <button disabled={!(login && password)} onClick={() => onReg(login, password)}>Registration</button>&nbsp;
              <Link to="/login" >
                <button>Login &gt;&gt;</button>
              </Link>
            </p>
        </div>
    )
}

const CRegistrationForm = connect(null, { onReg: actionFullRegister })(RegistrationForm)


const Page404 = () => 
  <h1>404</h1>
    
// const MainContainer = () => { 
//   useEffect(() => {
//         store.dispatch(actionAllAds())
//     }, [localStorage.authToken])
//   return (
//     <Main />
//   )
// }

const Main = () => 
<main>
        <Switch>
            
            {/* {!localStorage.authToken && <Route path="/" component={CLoginForm} />} */}
            
            <Route path="/" component={PageMain} exact />
            <Route path="/login" component={CLoginForm} />
            <Route path="/ad/:_id" component={CAdPage} />
            <Route path="/registration" component={CRegistrationForm} />
      <Redirect from="/main" to="/" />
      {!localStorage.authToken && <Redirect from="/" to="/login" />}
            <Route path="*" component={Page404} />
        </Switch>
</main>

const Footer = () =>
<footer>
    <Logo /> 
</footer>

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Main />
          {/* <MainContainer /> */}
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;


