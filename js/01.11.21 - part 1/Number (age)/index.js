//С помощью prompt спросить у пользователя его возраст и подсчитать год рождения. Год рождения вывести с помощью alert
//-------------
let age

function myAge() {
    age = prompt('Сколько Вам лет?')
    return age
}

let born = () => alert(`Вы родились в ${2021 - age} году`)

myAge()
born()