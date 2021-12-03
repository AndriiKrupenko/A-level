// Светофор
// Используя асинхронную функцию и бесконечный цикл, просимулируйте светофор:
// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// async function trafficLight(){
//     while (true){
//         включаем зеленый
//         await delay(время зеленого)
//         включаем желтый
//         await delay(время желтого)
//         включаем красный
//         await delay(время красного)
//     }
// }
// Для отображения включения того или иного света используйте один или три DOM-элемента.
//------------------

// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// async function trafficLight(){
//     while (true) {
//         document.body.style.backgroundColor = "green"
//         await delay(5000)
//         document.body.style.backgroundColor = "yellow"
//         await delay(5000)
//         document.body.style.backgroundColor = "red"
//         await delay(5000)
//     }
// }

// trafficLight()

//------------------
// Stage 2
//------------------
// Сделайте trafficLight более универсальной - добавьте в параметры DOM - элемент для отображения, а так же время работы каждого цвета
//------------------

// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// async function trafficLight(elem, greenTime, yellowTime, redTime){
//     while (true) {
//         elem.style.backgroundColor = "green"
//         await delay(greenTime)
//         elem.style.backgroundColor = "yellow"
//         await delay(yellowTime)
//         elem.style.backgroundColor = "red"
//         await delay(redTime)
//     }
// }

// trafficLight(document.body, 3000, 2000, 4000)

//------------------
// domEventPromise
//------------------
// Реализуйте промисифицированную функцию, которая резолвит промис по событию в DOM:
// domEventPromise(knopka, 'click').then( e => console.log('event click happens', e))
// Функция должна:
// используя addEventListener повесить свой обработчик события на DOM element событие eventName
// по событию зарезолвить промис отдав в качестве результата объект события
// убрать обработчик с DOM-элемента, используя removeEventListener
//------------------

// let knopka = document.createElement('button')
// document.body.append(knopka)
// knopka.innerText = "Click"

// function domEventPromise(elem, eventName) {

//     return new Promise((resolve, reject) => {

//         const handleClick = (e) => {
//             elem.removeEventListener(eventName, handleClick)
//             resolve(e)
//         }

//         elem.addEventListener(eventName, handleClick)
//     })
// }

// domEventPromise(knopka, 'click').then(e => console.log('event click happens', e))

//------------------
// PedestrianTrafficLight
//------------------
// Напишите упрощенный светофор для пешеходов
//------------------
// Stage 2 & Stage 3
//------------------
// Используя Promise.race, domEventPromise и кнопку в DOM сделайте пешеходный светофор с кнопкой, который так же переключается по времени периодически.
//------------------
// Не давайте возможности пешеходам сильно наглеть - предусмотрите задержку, после которой будет работать кнопка.
//------------------

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

async function trafficLight(elem, Time){
    while (true) {
        elem.style.backgroundColor = "red"
        knopka.disabled = true
        await delay(2000)
        knopka.disabled = false
        await Promise.race([domEventPromise(knopka, 'click'), delay(Time-2000)])
        elem.style.backgroundColor = "green"
        await delay(Time)
    }
}

let knopka = document.createElement('button')
document.body.append(knopka)
knopka.innerText = "Click"

function domEventPromise(elem, eventName) {
    return new Promise((resolve, reject) => {

        const handleClick = () => {
            document.body.style.backgroundColor = "green"
            elem.removeEventListener(eventName, handleClick)
            resolve()
        }

        elem.addEventListener(eventName, handleClick)
    })
}

trafficLight(document.body, 5000)


