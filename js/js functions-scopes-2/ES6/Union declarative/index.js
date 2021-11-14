// Используйте ассоциативный массив вместо switch
//------------------
let a = (message) => alert(message)

let aSample = () => a("Привет!") 

let cube = (num) => Math.pow(num, 3)

let cubeSample = () => console.log(cube(5))

let avg2 = (a, b) => (a + b) / 2

let avg2Sample = () => { console.log(avg2(1, 2)); console.log(avg2(10, 5)) }

let sum3 = (a, b, c = 0) => console.log(a + b + c)

let sum3Sample = () => { 
    console.log(sum3(1,2,3))
    console.log(sum3(5,10,100500))
    console.log(sum3(5,10))
}

let intRandom = (a, b) => {
    let num
    if (b == undefined) {
        b = a
        a = 0
    }

    do {
       num = Math.round(Math.random()*b)
    } while (num < a)

    if (a == b) {
        num = b
    }
    
    console.log(num)
}

let intRandomSample = () => {
    console.log(intRandom(2,15))
    console.log(intRandom(-1,-1))
    console.log(intRandom(0,1))
    console.log(intRandom(10))
}

function greetAll() {
    let names = ''
    for (key of arguments) {
        names += `${key}, `
    }
    names = names.slice(0, -2)
    alert(`Hello ${names}`)
}

function greetAllSample() {
    greetAll("Superman")
    greetAll("Superman", "SpiderMan")
    greetAll("Superman", "SpiderMan", "Captain Obvious")
}

function sum() {
    let sumParam = 0
    for (key of arguments) {
        sumParam = sumParam + key
    }
    console.log(sumParam)
}

function sumSample() {
    sum(1)
    sum(2)
    sum(10,20,40,100)
}

let union = prompt("Введите название задания")

let tasks = {
    a: aSample,
    cube: cubeSample,
    avg2: avg2Sample,
    sum3: sum3Sample,
    intrandom: intRandomSample,
    greetall: greetAllSample,
    sum: sumSample
}


for (key in tasks) {
    if (union.toLowerCase() == key) {
        tasks[key]()
    }
}