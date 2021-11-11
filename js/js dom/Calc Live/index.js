// Сделайте расчет живым, т. е. обновляющимся по событию oninput каждого поля ввода, влияющего на результат. Нет смысла копировать одну и ту же калькуляцию, поэтому вначале задекларируйте функцию расчета, а потом присвойте её в качестве обработчика события в каждом поле ввода:
//-------------------
// function calc() {
//     result.value = (+input1.value) + (+input2.value)
// }
// input1.oninput = calc
// input2.oninput = calc
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

let p5 = document.createElement('p')
div.appendChild(p5)
p5.innerHTML = "Total (UAH):"

let usdRate = 26.45
let eurRate = 30.7

function calc() {
    p5.innerHTML = `Total (UAH): <b>${(input1.value * usdRate + input2.value * eurRate).toFixed(2)}</b>`
}

input1.oninput = calc
input2.oninput = calc