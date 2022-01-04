import logo from './logo.svg';
import './App.css';

//-----------------gql---------------------------------------------------------------------------
const getGQL = url =>
    (query, variables = {}) =>
        fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} :
                                         {})
        },
        body: JSON.stringify({query, variables})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(data => {
        //     if (data.errors && !data.data)
        //         throw new Error(JSON.stringify(data.errors))
        //     return data.data[Object.keys(data.data)[0]]
        // })

const backURL = 'http://marketplace.asmer.fs.a-level.com.ua'
    
const gql = getGQL(`${backURL}/graphql`)

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

gql(`query adById($query: String){
        AdFindOne(query:$query){
            title, 
            description,
            price,
            images {
              url
            }
				}
}`, {query: JSON.stringify([
    { _id: "5dc9c9a879064d79bb6ba069" },
 // { skip: [100] } 
    ])
})

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
