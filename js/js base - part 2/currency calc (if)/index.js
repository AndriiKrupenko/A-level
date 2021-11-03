// Сделать тоже самое на if
//------------------
let rate
let amount
let currency = prompt('Введите "usd" или "eur"')
let trade = prompt('Введите "buy" или "sell"')

if (currency.toLowerCase() == "usd") {
    if (trade == "buy") {
        rate = 26.35
    } else if (trade == "sell") {
        rate = 26.25
    } else {
    alert('error')
    }
} else if (currency.toLowerCase() == "eur") {
    if (trade == "buy") {
        rate = 30.55
    } else if (trade == "sell") {
        rate = 30.45
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


