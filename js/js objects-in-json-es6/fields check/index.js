// Проверьте наличие необязательных полей у каждого из этих массивов. Если поле найдено, выведите его с помощью alert. Проверку делайте по typeof или in в if.
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

let d = {
    name: "",
    surname: ""
}

for (key in a) {
    if (!(key in d)) {
        alert(key)
    }
}

for (key in b) {
    if (!(key in d)) {
        alert(key)
    }
}

for (key in c) {
    if (!(key in d)) {
        alert(key)
    }
}


