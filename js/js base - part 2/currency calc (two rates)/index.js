// Добавить к возможность выбора обменного курса на продажу и покупку. Используйте confirm для ввода пользователя и тернарный оператор для величины курса.
//------------------
let rate
let amount
let currency = prompt('Введите "usd" или "eur"')
let trade = prompt('Введите "buy" или "sell"')

switch (currency.toLowerCase()){
    case "usd": trade == "buy" ? rate = 26.35 : rate = 26.25
        break
    case "eur": trade == "buy" ? rate = 30.55 : rate = 30.45 
        break
    default: alert('error')
}

if (rate) {
   amount = +prompt(`Сколько ${currency.toLowerCase()} вы хотите обменять?`)
   alert(`${amount*rate} грн`) 
}


