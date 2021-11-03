// Улучшить предыдущее задание: сделать возможность ввода валюты любыми буквами (usd, uSd, USD), используйте str.toLowerCase().
//------------------
let rate
let amount
let currency = prompt('Введите "usd" или "eur"')

switch (currency.toLowerCase()){
    case "usd": rate = 26.25
        break
    case "eur": rate = 30.45;
        break
    default: alert('error')
}

if (rate) {
   amount = +prompt(`Сколько ${currency.toLowerCase()} вы хотите обменять?`)
   alert(`${amount*rate} грн`) 
}


