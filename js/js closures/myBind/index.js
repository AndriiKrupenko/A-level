// Изучите встроенную функцию bind, и сделайте свою версию, которая позволит определить "значение по умолчанию" не только для первых параметров, но для любых других, например для степени в Math.pow:
//------------------
// var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию, 
//                                                   // второй - this для этой функции, третий - массив, в котором undefined означает
//                                                   // параметры, которые должны передаваться при вызове,
//                                                   // а другие значения являются значениями по умолчанию:
// var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

// pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
// cube(3) // => 27

// var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
// chessMin(-1,-5,3,15) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

// var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt, 
//                                                           // а текст приглашения пользователя задается при вызове zeroPrompt
// var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")

// myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f'])('a', 'c', 'd') === 'abcdef'
//------------------
// Массив, который идет третьим параметром определяет, какие поля должны подменяться значением по умолчанию, а какие - задаваться в последствии (undefined).
//------------------

function myBind(fn, obj, arr) {
    return function (...args) {
        if (obj == null) {
            obj = this
        }
        obj.func = fn
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == undefined) {
                arr[i] = args[0]
                args.shift()
            }
        }
        let arrAll = arr.concat(args)
        console.log(arrAll)
        const result = obj.func(...arrAll)
        return console.log(result)
    }
}

// debugger;

var pow5 = myBind(Math.pow, Math, [undefined, 5])
pow5(2)

var cube = myBind(Math.pow, Math, [undefined, 3])
cube(3)

var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9])
chessMin(-1, -5, 3, 15)

var zeroPrompt = myBind(prompt, window, [undefined, "0"])
var someNumber = zeroPrompt("Введите число")

myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f'])('a', 'c', 'd') === 'abcdef'