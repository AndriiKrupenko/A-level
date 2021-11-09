// Сделайте цикл, который выводит весь массив persons, в форме HTML-таблицы. Имя и Фамилия, а так же другие поля при наличии. Колонки: поля, строки таблицы - персоны.
//------------------
let a = {name: "Ivan", surname: "Ivanov", sex: "man", height: 183}
let b = {name: "Petr", surname: "Petrov", age: 30, weight: 90}
let c = {name: "Sidor", surname: "Sidorov", fathername: "Sidorovich", hair: "black"}
let persons = [a, b, c, { name: "Yan", surname: "Yanov" }]

let str = "<table border='1'>"
for (let i = 0; i < persons.length; i++){
    str += "<tr>"
    for (key in persons[i]) {
        str += `<td>${key}: ${persons[i][key]}</td>`
    }
    str += "</tr>"
}
str += "</table>"

console.log(str)
document.write(str)
