// Сделайте игру "камень-ножницы-бумага". Пользователь вводит свой вариант через prompt, программа генерирует свой вариант через Math.random() и выводит через alert. Следующий alert выводит имя победителя или "ничья"
//------------------

let user = prompt('Введите "камень", "ножницы" или "бумага"')
let programValue = Math.random()
let program
if (programValue <= 0.33) {
    program = "камень"
} else if (programValue <= 0.66) {
    program = "ножницы"
} else {
    program = "бумага"
}
alert(`Вариант компьютера: ${program}`)

if (user == program) {
    alert('ничья')
} else if (user == "камень" && program == "ножницы") {
    alert('Победил пользователь')
} else if (user == "камень" && program == "бумага") {
    alert('Победил компьютер')
} else if (user == "ножницы" && program == "камень") {
    alert('Победил компьютер')
} else if (user == "ножницы" && program == "бумага") {
    alert('Победил пользователь')
} else if (user == "бумага" && program == "камень") {
    alert('Победил пользователь')
} else if (user == "бумага" && program == "ножницы") {
    alert('Победил компьютер')
} else {
    alert('error')
}
