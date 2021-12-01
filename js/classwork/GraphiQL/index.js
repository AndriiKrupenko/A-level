// 
//------------------

// const gql = (url, query, variables = {}) =>
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({ query, variables })
//     }).then(res => res.json())
//     //fetch на урл
//     //метод POST
//     //заголовок content-type: application/json
//     //тело - json с query и variables
//     // 

// ;(async () => {
//     console.log(await gql(`http://shop-roles.asmer.fs.a-level.com.ua/graphql`, `query cats{
//       CategoryFind(query:"[{}]"){
//         name goods{
//           name 
//         }
//       }
//     }`))
// })()

// https://jwt.io/
console.log(JSON.parse(atob("eyJzdWIiOnsiaWQiOiI2MWE3NDczZGM3NTBjMTJiYTZiYTQwOTEiLCJsb2dpbiI6IkFuZHJpaUtydXBlbmtvIiwiYWNsIjpbIjYxYTc0NzNkYzc1MGMxMmJhNmJhNDA5MSIsInVzZXIiXX0sImlhdCI6MTYzODM1Mzk1MX0")))

// mutation newOrder {
//   OrderUpsert(order:{
//     orderGoods: [
//       {count:3, good:{_id: "5dc888d20e36db246e3049c5" }},
//       {good:{_id: "5dcad1316d09c45440d14d07"}, count:10}
//     ]
//   })
  
//   {_id total}
// }

// query o{
//   OrderFind(query: "[{}]"){
//     _id total orderGoods{
//       price count total good{
//         name 
//       }
//     }
//   }
// }

// query log($login: String, $password: String){
//   login(login:$login,
//   password:$password)
// }

// query goodz{
//   GoodFind(query: "[{}]"){
//     _id name price categories{
//       name _id
//     }
//     images{
//       url
//     }
//   }
// }

// mutation reg($login: String, $password: String){
//   UserUpsert(user:{login:$login,
//     							 password:$password,
//     							 nick:$login}){
//     _id login
//   }
// }

// {
//   "login": "AndriiKrupenko",
//   "password": "qwerty"
// }