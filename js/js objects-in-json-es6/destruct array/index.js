// let arr = [1,2,3,4,5, "a", "b", "c"]
//------------------
// напишите код, который используя деструктуризацию положит:
// четные числа в переменные even1, even2,
// нечетные в odd1, odd2, odd3,
// буквы в отдельный массив
//------------------

let arr = [1, 2, 3, 4, 5, "a", "b", "c"]

const resultEven = arr.filter(num => num%2 == 0)
let [even1, even2] = resultEven

const resultOdd = arr.filter(num => num%2 != 0)
let [odd1, odd2, odd3] = resultOdd

const resultLetters = arr.filter(num => (typeof num == 'string'))


console.log(even1, even2, odd1, odd2, odd3, resultLetters)