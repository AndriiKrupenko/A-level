// //Сделайте обобщенную функцию сортировки массива
//------------------
// var persons = [
//     {name: "Иван", age: 17},
//     {name: "Мария", age: 35},
//     {name: "Алексей", age: 73},
//     {name: "Яков", age: 12},
// ]
//------------------
// sort(persons, "age"); //сортирует по возрасту по возрастанию
// sort(persons, "name", false); //сортирует по имени по убыванию
// Функция позволяет отсортировать любой набор данных по имени поля (второй параметр). Третьим параметром идет необязательный Boolean, который в случае true делает сортировку по возрастанию, в случае false - по убыванию. По умолчанию (без третьего параметра) происходит сортировка по возрастанию.
//------------------

var persons = [
    {name: "Иван", age: 17},
    {name: "Мария", age: 35},
    {name: "Алексей", age: 73},
    {name: "Яков", age: 12},
]

function sort(arr, fieldName, sortBoolean=true) {
    if (sortBoolean) {
        arr.sort(function (a, b) {
            if (a[fieldName] > b[fieldName]) {
                return 1;
            }
            return -1;
        })
    } else {
        arr.sort(function (a, b) {
            if (a[fieldName] > b[fieldName]) {
                return -1;
            }
            return 1;
        })
    }
}

sort(persons, "age")
console.log(persons)

// sort(persons, "name", false)
// console.log(persons)

