// Сделайте цикл, который выводит весь массив persons, но только Имя и Фамилию каждой персоны.
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

for (i = 0; i < persons.length; i++) {
    console.log(`${persons[i].name} ${persons[i].surname} `)
}

