//Сделайте калькулятор для расчета деления нацело двух чисел. Используйте Math.floor или альтернативы.
//--------------------
let a
let b

function first() {
    a = prompt('Введите первое число')
    return a
}

function second() {
    b = prompt('Введите второе число')
    return b
}

first()
second()

if (Math.abs(a) > Math.abs(b)) {
    alert(Math.floor(a / b))
} else {
    alert(Math.floor(b / a))
}