// допилить getGQL:
//------------------

const getGQL = url =>
    (query, variables = {}) =>
        fetch(url, {
        //метод
        method: 'POST',
        headers: {
            //заголовок content-type
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        },
        //body с ключами query и variables 
        body: JSON.stringify({query, variables})
        }).then(res => res.json())
            .then(data => {
                for (key in data.data) {
                    data = data.data[key]
                }
                if (data) {
                return data
                } else {
                return new Error('Error')
                }
        //расковырять data, если все ок - отдать data.login или data.CategoryFindOne, или шо там еще
        //если есть errors и нет data, то выбросить исключение и тем самым зареджектить промис
        }).catch(error => console.log(error))
    
const gql = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')
    
;(async () => {
    console.log((await gql(`
        query NameForMe1($login:String, $password:String){
            login(login:$login, password:$password)
        }
`, { login: 'AndriiKrupenko', password: 'qwerty' })))
})()

// ;(async () => {
//     console.log((await gql(`
//         query cats{
//             CategoryFind(query:"[{}]"){
//                 name goods{
//                 name 
//                 }
//             }
//         }
//     `)))
// })()

// ;(async () => {
//     console.log((await gql(`
//         query o{
//             OrderFind(query: "[{}]"){
//                 _id total orderGoods{
//                     price count total good{
//                         name 
//                     }
//                 }
//             }
//         }
//     `)))
// })()

//------------------

function regDo(login, password, nick){
    return gql(`mutation reg($login: String, $password: String, $nick: String){
        UserUpsert(user:{login:$login, password:$password, nick:$nick}){
            _id login nick
        }
    }`, { login: login, password: password, nick: nick })
}

// regDo('Bober', '123', 'Bober').then(res => console.log(res))

function loginDo(login, password){
    return gql(`query log($login: String, $password: String){
        login(login:$login, password:$password)
    }`, { login: login, password: password })
}

// loginDo('AndriiKrupenko', 'qwerty').then(res => console.log(res))

function categoryAll(){
    return gql(`query cats{
      CategoryFind(query:"[{}]"){
         _id name goods{
           name 
        }
      }
    }`)
}

//categoryAll().then(res => console.log(res))

function catById(_id){
    return gql(`query catById($query:String){
        CategoryFindOne(query:$query){
            name goods{
                _id name
            }
        }
    }`, {query: JSON.stringify([{_id}])})
}

// catById("5dc45acf5df9d670df48cc48").then(res => console.log(res))

function goodsAll(){
    return gql(`query goodsAll{
        GoodFind(query: "[{}]"){
            _id name price categories{
                name _id
            }
            images{
                url
            }
        }
    }`)
}

// goodsAll().then(res => console.log(res))

function goodById(_id){
    return gql(`query goodById($query:String){
        GoodFindOne(query:$query){
            _id name price 
        }
    }`, { query: JSON.stringify([{_id}])})
}

// goodById("5dc882c90e36db246e3049bc").then(res => console.log(res))

function orderAll(){
    return gql(`query orderAll{
        OrderFind(query: "[{}]"){
            _id total orderGoods{
                price count total good{
                    name 
                }
            }
        }
    }`)
}

// orderAll().then(res => console.log(res))

function orderById(_id){
    return gql(`query orderById($query:String){
        OrderFindOne(query:$query){
            _id total  
        }
    }`, { query: JSON.stringify([{_id}])})
}

// orderById("61a76368c750c12ba6ba40b6").then(res => console.log(res))