//Сделайте перевод из нашей системы размеров в американскую или любую на выбор. Используйте prompt, условия сравнения и alert.
//-------------------

let size = prompt('Введите размер брюк в нашей системе размеров (от 40 до 54)')

if (size == 40) {
    alert('Размер в американской системе: 6')
} else if (size == 42) {
    alert('Размер в американской системе: 8')
} else if (size == 44) {
    alert('Размер в американской системе: 10')
} else if (size == 46) {
    alert('Размер в американской системе: 12')
} else if (size == 48) {
    alert('Размер в американской системе: 14')
} else if (size == 50) {
    alert('Размер в американской системе: 16')
} else if (size == 52) {
    alert('Размер в американской системе: 18')
} else if (size == 54) {
    alert('Размер в американской системе: 20')
} else {
    alert('У Вас нестандартный размер')
}

