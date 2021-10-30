let usd = 0;
let usdRate = 26.45;

let eur = 0;
let eurRate = 30.7;

function usdAmount(value) {
    usd = value * usdRate;
    return usd;
}

function eurAmount(value) {
    eur = value * eurRate;
    return eur;
}

document.getElementById('calc').onclick = function () {
    let total = usd + eur;
    alert(`Total (UAH): ${total.toFixed(2)}`)
};
