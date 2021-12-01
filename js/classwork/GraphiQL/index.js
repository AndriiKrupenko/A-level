// 
//------------------

const gql = (url, query, variables = {}) =>
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query, variables })
    }).then(res => res.json())
    //fetch на урл
    //метод POST
    //заголовок content-type: application/json
    //тело - json с query и variables
    // 

;(async () => {
    console.log(await gql(`http://shop-roles.asmer.fs.a-level.com.ua/graphql`, `query cats{
      CategoryFind(query:"[{}]"){
        name goods{
          name 
        }
      }
    }`))
})()
