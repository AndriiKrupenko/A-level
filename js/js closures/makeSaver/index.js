// Напишите функцию makeSaver, которая:
//     var saver = makeSaver(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random 
//                                       // в примере). На этом этапе Math.random НЕ вызывается
//     var value1 = saver()              //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
//     var value2 = saver()              //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную 
//                                       //в makeSaver функцию;
//     value1 === value2                 // всегда true

//     var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
//     var value3 = saver2()
//     var value4 = saver2()

//     value3 === value4 // тоже должно быть true
// Таким образом makeSaver решает две задачи:
// Навсегда сохраняет результат функции. Это актуально, например, для Math.random.
// Действует лениво, то есть вызывает Math.random только тогда, когда результат действительно нужен. Если же по каким-то причинам значение не понадобится, то Math.random даже не будет вызван
//------------------
debugger;
let makeSaver = fn => {
    let value = fn()
    return () => value
}
 
var saver = makeSaver(Math.random)
var value1 = saver()  
var value2 = saver()
alert(value1 === value2)

var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
var value3 = saver2()
var value4 = saver2()

alert(value3 === value4)

