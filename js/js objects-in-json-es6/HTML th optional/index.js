// Переработайте вывод persons в HTML с поиском всех возможных колонок во всех записях, выводом названий колонок в заголовок HTML-таблицы. Для решения этой задачи вначале узнайте множество полей (ключей) во всех записях (они не совпадают), выведите HTML-заголовок используя тэги <th>, а потом выводите все записи. Ниже выведите все персоны построчно. Следите за корректностью колонок. Для этого вам нужно итерировать общий набор колонок, а не каждую персону, колонки из которой могут отличаться от предыдущей.
//------------------
let a = {name: "Ivan", surname: "Ivanov", sex: "man", height: 183}
let b = {name: "Petr", surname: "Petrov", age: 30, weight: 90}
let c = {name: "Sidor", surname: "Sidorov", fathername: "Sidorovich", hair: "black"}
let persons = [a, b, c, { name: "Yan", surname: "Yanov" }]

let col = []

for (let i = 0; i < persons.length; i++) {
    for (key in persons[i]) {
        if (!(col.includes(key))) {
            col.push(key)
        } 
    }
}

let str = "<table border='1'><tr>"

for (value of col) {
  str += `<th>${value}</th>`;
}
str += "</tr>"


for (i = 0; i < persons.length; i++) {
    if (i % 2 == 0) {
        str += "<tr bgcolor='yellow'>"
        for (value of col) {
            if (persons[i][value]) {
                str += `<td>${persons[i][value]}</td>`;
            } else {
                str += `<td></td>`;
            }
        }
        str += "</tr>"
    } else {
        str += "<tr>"
        for (value of col) {
            if (persons[i][value]) {
                str += `<td>${persons[i][value]}</td>`;
            } else {
                str += `<td></td>`;
            }
        }
        str += "</tr>"
    }
}
    
document.write(str)




