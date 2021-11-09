// Добавьте к предыдущему примеру раскраску через строчку используя другой стиль тэга tr.
//------------------
let a = {name: "Ivan", surname: "Ivanov", sex: "man", height: 183}
let b = {name: "Petr", surname: "Petrov", age: 30, weight: 90}
let c = {name: "Sidor", surname: "Sidorov", fathername: "Sidorovich", hair: "black"}
let persons = [a, b, c, { name: "Yan", surname: "Yanov" }]

let str = "<table border='1'>"
for (let i = 0; i < persons.length; i++){
   if (i % 2 == 0) {
    str += "<tr bgcolor='yellow'>"
    for (key in persons[i]) {
        str += `<td>${key}: ${persons[i][key]}</td>`
    }
    str += "</tr>"
} else {
    str += "<tr>"
    for (key in persons[i]) {
        str += `<td>${key}: ${persons[i][key]}</td>`
    }
    str += "</tr>"
} 
}
str += "</table>"

console.log(str)
document.write(str)


