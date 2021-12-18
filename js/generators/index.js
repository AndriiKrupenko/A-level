// Дописать функцию, которая запускает генератор
//------------------
// function run(gena) { 
//     let iter = gena()
//     function next(result, error) { //результат промиса
//         //если нет ошибки, то:
//         let { value, done } = iter.next(result)
//         //если есть ошибка, то iter.throw.
//         //однако все остальное потом должно работать как обычно
//         if (value && typeof value?.then === 'function') { 
//             value.then(next, err => next(undefined, err))
//         } //а если не промис, то сразу next с value
//     }
//     next() //первый раз результат бесполезен
// }
// run(likeAsync)
//------------------

// функция-генератор
//------------------
function* likeAsync() { 
    try {
        console.log(yield fetch('https://swapi.dev/api/people/1/'))
        // console.log(yield 1)
    }
    catch (e) { 
        console.log('GENA ERROR CATCH', e)
    }
}
//------------------

function run(gena) { 
    let iter = gena()
    function next(result, error) { //результат промиса
        //если нет ошибки, то:
        if (!error) {
            let { value, done } = iter.next(result)
            console.log(value, done)
        } //если есть ошибка, то iter.throw. 
        //однако все остальное потом должно работать как обычно
        else { 
            let { value, done } = iter.throw(error)
        }
        if (done) return
        if (value && typeof value?.then === 'function') {
            value.then(next, err => next(undefined, err))
        } //а если не промис, то сразу next с value
        else { 
            next(value)
        }
    }
    next() //первый раз результат бесполезен
}

run(likeAsync)