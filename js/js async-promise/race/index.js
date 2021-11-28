// Используя Promise.race запустите запрос на API (myfetch) параллельно с delay. По результату определите, что было быстрее, запрос по сети, или определенный интервал времени. Подберите параметр delay так, что бы результат был неизвестен изначально, и при многократных запусках быстрее был то delay, то myfetch.
//------------------

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

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

Promise.race([delay(72), myfetch('https://swapi.dev/api/people/1/')]).then(result => {
    if (typeof result == 'number') {
        console.log('delay')
    } else {
        console.log('myfetch')
    }
})