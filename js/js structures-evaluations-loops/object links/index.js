// Добавьте персоне гаджеты, используя новые поля smartphone и laptop в объекте персоны
// Добавьте владельца в гаджеты, используя новое поле owner в объектах телефона и ноутбука.
// обратите внимание на цикличность ссылок в объектах, если вы все сделали правильно, то
// person.smartphone.owner.laptop.owner.smartphone == person.smartphone
//------------------

let notebook = {
    brand: prompt("Enter a brand"),
    type:  prompt("Enter a type"),
    model: prompt("Enter a model"),
    ram: +prompt("Enter a ram"),
    size: prompt("Enter a size"),
    weight: +prompt("Enter a weight"),
    resolution: {
        width: +prompt("Enter a width"),
        height: +prompt("Enter a height"),
    }
}

let phone = {
    brand: prompt("Enter a brand"),
    model: prompt("Enter a model"),
    ram: +prompt("Enter a ram"),
    color: prompt("Enter a color")
}

let person = {
    name: prompt("Enter a name"),
    surname: prompt("Enter a surname"),
    married: confirm("married?")
}

person.smartphone = phone
person.laptop = notebook
notebook.owner = person
phone.owner = person

console.log(person.smartphone.owner.laptop.owner.smartphone == person.smartphone)