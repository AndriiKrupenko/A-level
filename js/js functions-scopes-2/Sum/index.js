// Напишите функцию, который будет считать сумму арифметической прогрессии рекурсивно.
//------------------

// a - первый член
// b - шаг
// n - предел для члена

function sumTo(a = 0, d = 1, n = 100) {
    if (n <= a) {
        return a
    } else if (n <= a + d) {
        return a
    } else {
       return a + sumTo((a+d), d, n)
    }  
}

console.log(sumTo(1, 3, 15))