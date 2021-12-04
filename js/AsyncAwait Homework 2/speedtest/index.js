// Написать асинхронную функцию
//------------------
// async function speedtest(getPromise, count,parallel=1){
// ....
//     return {
//         duration,
//         querySpeed, //средняя скорость одного запроса
//         queryDuration, //
//         parallelSpeed,
//         parallelDuration
//     }
// }

// speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
// // {duration: 10000, 
// // querySpeed: 0.001, //1 тысячная запроса за миллисекунду
// // queryDuration: 1000, //1000 миллисекунд на один реальный запрос в среднем 
// // parallelSpeed: 0.01  // 100 запросов за 10000 миллисекунд
// // parallelDuration: 100 // 100 запросов за 10000 миллисекунд
// speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
//------------------
// где:
// count - количество повторов
// parallel - количество одновременных запросов/промисов в одном повторе
// getPromise - функция, которая умеет вернуть нужный Вам промис для тестирования скорости его работы
// которая будет в цикле count раз создавать parallel промисов с помощью переданной функции getPromise, дожидаться выполнения всех parallel промисов, после чего цикл повторяется.
// Замерить время общее время выполнения, и вычислить:
// duration, общую длительность работы цикла
// parallelDuration, среднее время обработки запроса параллельно (за какое время исполнилось parallel*count промисов),
// paralledSpeed, скорость в запросах в миллисекунду
// queryDuration, реальное среднее время запроса (отталкиваясь от count и времени работы цикла).
// querySpeed, реальное средняя скорость запроса
// Эти переменные вернуть в одном объекте-результате (см. заготовку выше)
// Для отладки попробуйте на delay (пример выше есть, реальное время будет отличаться на единицы-десятки миллисекунд). Потом можете попробовать на swapi.dev. Не создавайте чрезмерно много параллельных запросов.
//------------------

async function speedtest(getPromise, count, parallel = 1) {
    let result = {}
    let t0 = performance.now()
    for (let i = 1; i <= count; i++) {
        let arrPromises = []
        for(let j = 1; j <= parallel; j++) {
            arrPromises.push(getPromise())
        }
        await Promise.all(arrPromises)
    }
    
    let t1 = performance.now()

    result.duration         = t1 - t0
    result.querySpeed       = count/result.duration
    result.queryDuration    = result.duration/count
    result.parallelSpeed    = parallel * count / result.duration
    result.parallelDuration = result.duration/(parallel*count)

    return result
}

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result))