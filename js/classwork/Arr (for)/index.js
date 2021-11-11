// // Перепишите
// inlineWay[3] = inlineWay[0] + inlineWay[1] + inlineWay[]
// так, что бы можно было сконкатенировать массив с любым количеством элементов, используя цикл for.
//------------------
let arr = [1, 2, 3, 4, 5, 6]
let sum = 0
for (value of arr) {
    sum += value 
}
arr.push(sum)
console.log(sum)



