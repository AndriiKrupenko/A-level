import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import store from './reducers';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
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

const Logo = () =>
<Link to="/" >
    <img src={logo} className="Logo" alt="logo" />
</Link>

const Header = () =>
<header>
    <Logo /> 
    <Link to="/login" >
        <button>Login</button>
    </Link>
    <Link to="/registration" >
        <button>Registration</button>
    </Link>
 </header>

const Ad = ({ _id, title, images, description, owner }) =>
  <li>
    <Link to={`/ad/${_id}`}>
      <div className='adsMainPage'>
        {images && images[0] && images[0].url && <img src={'http://marketplace.asmer.fs.a-level.com.ua/' + images[0].url} />}
        <h2>{owner.login}</h2>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </Link>
  </li>

const AllAds = ({ ads }) =>
  <ul>
    {ads.map((item) => <Ad {...item} key={Math.random()}/> )}
  </ul>

const CAllAds = connect(state => ({ads: state.promiseReducer.allAds?.payload || []}))(AllAds)

const PageMain = () => 
    <>
      <h1>Главная страница</h1>
      <CAllAds />
    </>
    

const Page404 = () => 
    <h1>404</h1>

const Main = () =>
<main>
        <Switch>
            <Redirect from="/main" to="/" />
            <Route path="/" component={PageMain} exact />
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
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
