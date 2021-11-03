// Калькулятор обмена валют. Первый prompt спрашивает валюту: "usd" или "eur". С помощью switch установите обменный курс для валюты, выбранной пользователем, после чего спросите величину и переведите её из гривны в выбранную на первом prompt валюту. Выведите результат в alert()
//------------------
let rate
let currency = prompt('Введите "usd" или "eur"')

switch (currency){
    case "usd": rate = 26.25
        break
    case "eur": rate = 30.45
        break
    default: alert('error')
}

let amount = +prompt(`Сколько ${currency} вы хотите обменять?`)

alert(`${amount*rate} грн`)