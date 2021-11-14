// Напишите свою реализацию Array.filter для объектов:
//------------------
// var phone = {
//     brand: "meizu",
//     model: "m2",
//     ram: 2,
//     color: "black",
// };
//------------------
// filter(phone,(key,value) => key == "color" || value == 2);
// должно вернуть
//------------------
// {
//     ram: 2,
//     color: "black",
// }
//------------------
// Для удаления пары ключ-значение используйте delete. Или сделайте копию объекта.
//------------------

var phone = {
    brand: "meizu",
    model: "m2",
    ram: 2,
    color: "black",
}

let newObj = {}

function filter(obj, filterFunc) {
    Object.entries(obj).reduce(({},[key, value]) => {
        if (filterFunc(key, value)) {
            newObj[key] = obj[key]
        }
        return newObj
    })
}

filter(phone, (key, value) => key == "color" || value == 2)
console.log(newObj)
