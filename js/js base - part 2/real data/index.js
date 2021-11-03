// Иcпользуя заготовку ниже реализуйте перевод валют с реальными данными.
// fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
//      .then(data => {
//             console.log(data.rates.UAH)
//         })    
//------------------

let rate
let currency = prompt('Введите "usd" или "eur"')
let amount = +prompt(`Сколько ${currency.toLowerCase()} вы хотите обменять?`)

switch (currency.toLowerCase()){
    case "usd": fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
         rate = data.rates.UAH
         alert(`${amount * rate} грн`)
     })
        break
    case "eur": fetch('https://open.er-api.com/v6/latest/EUR').then(res => res.json())
     .then(data => {
         rate = data.rates.UAH
         alert(`${amount * rate} грн`)
        })
        break
    default: alert('error')
}


