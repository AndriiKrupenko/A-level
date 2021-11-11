// Сделайте ваш калькулятор из первых занятий используя DOM и элементы input (в т. ч. type="number" для чисел) Каждому полю ввода присвойте тот или иной id для обращения в обрабочтике события.
// Для запуска раcчета используйте, например <button id="calc"> и
//-------------------
// calc.onclick = function(){
//     alert((+someIdOfInput1.value) + (+someIdOfInput2.value))
// }
//-------------------
// Также можете создать поле ввода для результата и записывать результат в value этого поля.
//-------------------

let div = document.createElement('div')
document.body.append(div)
div.style.width = "250px"
div.style.margin = "20px 0 0 20px"
div.style.padding = "15px 20px 15px 20px"
div.style.backgroundColor = "lightcyan"
div.style.borderRadius = "5px"
div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"

let h3 = document.createElement('h3')
div.appendChild(h3)
h3.innerText = "Money exchanger"
h3.style.textAlign = "center"
h3.style.marginTop = "0"

let p1 = document.createElement('p')
div.appendChild(p1)

let label1 = document.createElement('label')
p1.appendChild(label1)
label1.setAttribute('for', 'usd')
label1.innerText = "Total USD: "

let input1 = document.createElement('input')
p1.appendChild(input1)
input1.setAttribute('id', 'usd')
input1.type = "number"
input1.placeholder = "0"

let p2 = document.createElement('p')
div.appendChild(p2)
p2.innerHTML = "Rate (USD &#8594; UAH): <b>26.45</b>"

let p3 = document.createElement('p')
div.appendChild(p3)

let label2 = document.createElement('label')
p3.appendChild(label2)
label2.setAttribute('for', 'eur')
label2.innerText = "Total EUR: "

let input2 = document.createElement('input')
p3.appendChild(input2)
input2.setAttribute('id', 'eur')
input2.type = "number"
input2.placeholder = "0"

let p4 = document.createElement('p')
div.appendChild(p4)
p4.innerHTML = "Rate (EUR &#8594; UAH): <b>30.7</b>"

let button = document.createElement('button')
div.appendChild(button)
button.setAttribute('id', 'calc')
button.innerText = "Exchange"
button.style.backgroundColor = "lime"
button.style.height = "29px"
button.style.width = "100%"
button.style.marginTop = "10px"
button.style.border = "1px solid black"
button.style.borderRadius = "5px"
button.style.cursor = "pointer"
button.style.opacity = "0.7"
button.onmouseover = function() {
    button.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"
    button.style.opacity = "1"
}
button.onmouseout = function () {
    button.style.boxShadow = "none"
    button.style.opacity = "0.7"
}

let usdRate = 26.45
let eurRate = 30.7

button.onclick = function () {
    let total = input1.value * usdRate + input2.value * eurRate
    alert(`Total (UAH): ${total.toFixed(2)}`)
}

// Старый код (из предыдущего Д/З)

// let usd = 0;
// let usdRate = 26.45;

// let eur = 0;
// let eurRate = 30.7;

// function usdAmount(value) {
//     usd = value * usdRate;
//     return usd;
// }

// function eurAmount(value) {
//     eur = value * eurRate;
//     return eur;
// }

// document.getElementById('calc').onclick = function () {
//     let total = usd + eur;
//     alert(`Total (UAH): ${total.toFixed(2)}`)
// };
