// let obj = {name: 'Ivan',
//    surname: 'Petrov',
//    children: [{name: 'Maria'}, {name: 'Nikolay'}]}
//извлеките используя деструктуризацию имена детей в переменные name1 и name2
//------------------

let obj = {name: 'Ivan',
   surname: 'Petrov',
   children: [{name: 'Maria'}, {name: 'Nikolay'}]}

let { name: name1 } = obj.children[0]
let { name: name2 } = obj.children[1]

console.log(name1, name2)
