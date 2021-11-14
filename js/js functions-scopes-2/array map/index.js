// //Используя Array.map приведите все строки в массиве к числу. Элементы других типов оставьте как есть:
// ["1", {}, null, undefined, "500", 700]
// должно превратиться в
// [1, {}, null, undefined, 500, 700]
//------------------

let arr = ["1", {}, null, undefined, "500", 700]

let arr2 = arr.map(function (i) {
    if (typeof i == "string") {
        i = Number(i)
    }
    return i 
})