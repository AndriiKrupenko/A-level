// Напишите код, который будет делать обратный ежесекундный отсчёт в консоли, используя console.log. Используйте Self Invoked Function для создания замыкания и setTimeout для задержки вывода. Результатом должно быть:
//    5 //пауза 1 секунда
//    4 //пауза 1 секунда
//    3 //пауза 1 секунда
//    2 //пауза 1 секунда
//    1 //пауза 1 секунда
//    "поехали!"
//------------------

(function() {
    let i = 5

    function count() {
        console.log(i)
        i--
    }

    setTimeout(count, 1000)
    setTimeout(count, 2000)
    setTimeout(count, 3000)
    setTimeout(count, 4000)
    setTimeout(count, 5000)
    setTimeout(() => console.log("поехали!"), 6000)  
}())

