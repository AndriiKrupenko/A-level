// Сделайте тоже самое с помощью if и else
//------------------

let surname = prompt('введите фамилию')
if (!surname) {
    surname = "Иванов"
}
let name = prompt('введите имя')
if (!name) {
    name = "Иван"
}
let patronymic = prompt('введите отчество') 
if (!patronymic) {
    patronymic = "Иванович"
}

alert(`${surname} ${name} ${patronymic}`)
