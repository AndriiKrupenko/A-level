// Сделайте предыдущее задание, не используя push, а обращаясь к элементам по индексу.
//------------------

let arr = []
let loop = " "
while (loop) {
    loop = prompt('Введите новый элемент массива')
    if (loop) {
        arr[arr.length] = loop
    } else {
        break
    }
}