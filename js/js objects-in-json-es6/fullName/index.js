// Сделайте цикл, который добавляет поле fullName в каждый объект, содержащий ФИО. Учтите, что поле fathername не является обязательным.
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
    if (persons[i]['fathername']) {
        persons[i]['fullName'] = `${persons[i]['name']} ${persons[i]['fathername']} ${persons[i]['surname']}`
    } else {
        persons[i]['fullName'] = `${persons[i]['name']} ${persons[i]['surname']}`
    }
}

