// Создайте ассоциативный массив с одной персоной из JSON-строки. Добавьте её в persons
//------------------
let a = {
    name: "Ivan",
    surname: "Ivanov",
    sex: "man",
    height: 183
}

let b = {
    name: "Petr",
    surname: "Petrov",
    age: 30,
    weight: 90
}

let c = {
    name: "Sidor",
    surname: "Sidorov",
    fathername: "Sidorovich",
    hair: "black"
}

let persons = [a, b, c, { name: "Yan", surname: "Yanov" }]

let jsonStr = (JSON.stringify(persons))

let d = JSON.parse(jsonStr)[0]

persons.push(d)

