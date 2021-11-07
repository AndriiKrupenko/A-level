// Создайте бесконечный цикл, который прерывается с помощью конструкции break, когда Math.random() > 0.9. Код должен подсчитывать количество итераций и вывести это число с помощью alert.
//------------------

let count
for (count = 1; count; count++) {
    let num = Math.random()
    console.log(num)
    if (num > 0.9) {
        break
    }
}
alert(count)
