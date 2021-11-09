// Сделайте цикл, который выводит весь массив persons, в форме HTML-таблицы. Имя и Фамилия - колонки. Таблицы в HTML Пример кода:
//------------------
// var str = "<table border='1'>"
// for (let i=0;i<1;i++){
//     str += `<tr><td>${i}</td><td>адын</td></tr>`
// }
// str += "</table>"

// console.log(str)
// document.write(str)
//------------------
// Модифицируйте код так, что бы он выводил массив persons
//------------------
let a = {name: "Ivan", surname: "Ivanov", sex: "man", height: 183}
let b = {name: "Petr", surname: "Petrov", age: 30, weight: 90}
let c = {name: "Sidor", surname: "Sidorov", fathername: "Sidorovich", hair: "black"}
let persons = [a, b, c, { name: "Yan", surname: "Yanov" }]

let str = "<table border='1'><tr><th>Имя</th><th>Фамилия</th></tr>"
for (let i = 0; i < persons.length; i++){
    str += `<tr><td>${persons[i]['name']}</td><td>${persons[i]['surname']}</td></tr>`
}
str += "</table>"

console.log(str)
document.write(str)
