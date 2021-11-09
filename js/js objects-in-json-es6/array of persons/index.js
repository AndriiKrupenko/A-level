// Добавьте несколько ассоциативных массивов с персонами в обычный массив persons, например a,b,c. Так же добавьте персону литерально ({...}). Получится обычный массив с элементами-ассоциативными массивами с персонами.
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

let persons = [a, b, c, {name: "Yan", surname: "Yanov"}]

