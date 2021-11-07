// Напишите вложенный цикл, который будет создавать HTML для таблицы умножения. Используйте тэги table, tr, td. Таблица должна создаваться в строковой переменной. Для вывода этой переменной используйте document.write.
//------------------
let str = "<table>"
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
        str += "<tr>"
        for (let tdIndex = 0; tdIndex < 10; tdIndex++) {
            str += `<td> ${rowIndex * tdIndex} </td>`
        }
        str += "</tr>"
    }
str += "</table>"
document.write(str)



