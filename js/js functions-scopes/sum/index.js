// Напишите функцию sum, которая сумирует любое количество параметров: Используйте псевдомассив arguments для получения всех параметров, и for для итерирования по нему
//------------------

function sum() {
    let sumParam = 0
    for (key of arguments) {
        sumParam = sumParam + key
    }
    return sumParam
}
