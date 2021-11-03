// Сделать задания обмена валют используя ассоциативный массив (объект) подобной структуры. Добавьте дополнительные поля при надобности. Для обращения к нужному полю используйте [].
//------------------
// let ratios = {
//     usd: 25.6,
//     eur: 29
// }
//------------------
//----currency calc: two rates-----
// let ratios = {
//     usdBuy: 26.35,
//     usdSell: 26.25,
//     eurBuy: 30.55,
//     eurSell: 30.45
// }

// let rate
// let amount
// let currency = prompt('Введите "usd" или "eur"')
// let trade = prompt('Введите "buy" или "sell"')

// switch (currency.toLowerCase()){
//     case "usd": trade == "buy" ? rate = ratios["usdBuy"] : rate = ratios["usdSell"]
//         break
//     case "eur": trade == "buy" ? rate = ratios["eurBuy"] : rate = ratios["eurSell"]
//         break
//     default: alert('error')
// }

// if (rate) {
//    amount = +prompt(`Сколько ${currency.toLowerCase()} вы хотите обменять?`)
//    alert(`${amount*rate} грн`) 
// }

//----currency calc: if-----
let ratios = {
    usdBuy: 26.35,
    usdSell: 26.25,
    eurBuy: 30.55,
    eurSell: 30.45
}

let rate
let amount
let currency = prompt('Введите "usd" или "eur"')
let trade = prompt('Введите "buy" или "sell"')

if (currency.toLowerCase() == "usd") {
    if (trade == "buy") {
        rate = ratios["usdBuy"]
    } else if (trade == "sell") {
        rate = ratios["usdSell"]
    } else {
    alert('error')
    }
} else if (currency.toLowerCase() == "eur") {
    if (trade == "buy") {
        rate = ratios["eurBuy"]
    } else if (trade == "sell") {
        rate = ratios["eurSell"]
    } else {
    alert('error')
    }
} else {
    alert('error')
}

if (rate) {
   amount = +prompt(`Сколько ${currency.toLowerCase()} вы хотите обменять?`)
   alert(`${amount*rate} грн`) 
}