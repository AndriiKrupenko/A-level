let result = []
function myFilter(arr, f) {
    for (let item of arr) {
        if (f(item)) {
            result.push(item)
        }
    }
}



