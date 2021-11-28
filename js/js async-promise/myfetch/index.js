// Используя XMLHTTPRequest, напишите промисифицированную функцию myfetch, т. е. функцию, которая возвращает промис, и работает схоже с fetch, только в один этап:
//------------------
// myfetch('https://swapi.dev/api/people/1/')
//   .then(luke => console.log(luke))
//------------------
// Функция myfetch ожидает что ответ будет в формате JSON (используйте JSON.parse(response.text)) В случае ошибок (request.onerror или request.status не 200) не забудьте вызывать reject
//------------------
// function myfetch(url){
//     return new Promise(function (resolve, reject){
//         const xhr = new XMLHTTPRequest()
//         ///...
//     })
// }
//------------------

function myfetch(url){
    return new Promise(function (resolve, reject) {

        const xhr = new XMLHttpRequest()
        
        xhr.open('GET', url)

        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response))
            } else {
                reject(JSON.parse(xhr.response))
            }
        }

        xhr.onerror = () => {
            reject(JSON.parse(xhr.response))
        }

        xhr.send()
    })
}

myfetch('https://swapi.dev/api/people/1/')
  .then(luke => console.log(luke))
