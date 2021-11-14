// Получите произведение всех чисел в массиве, используя Array.reduce. Не обрабатывайте типы данных, не являющиеся числом.
// ["0", 5, 3, "string", null]
// результат должен быть 15
//------------------

let arr = ["0", 5, 3, "string", null]

let total = arr.reduce(function (mult, current) {
    if (typeof mult != 'number') {
        mult = 1
    } else if (typeof current != 'number') {
        current = 1
    }
    return mult * current 
})
