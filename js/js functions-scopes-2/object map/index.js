// Напишите свою реализацию Array.map для объектов:
// map({name: "Иван", age: 17},function(key,value){
//     var result = {};
//     result[key+"_"] = value + "$";
//     return result;
// })
//должен вернуть {name_: "Иван$", age_: "17$"}
//------------------

// debugger

let newObj = {}
function map(obj, mapFunc) {
        Object.entries(obj).reduce((i, [key, value]) => {
        i = mapFunc(key, value)
        newObj = Object.assign(newObj, i)   
    }, {}) 
    console.log(newObj)
}

map({name: "Иван", age: 17},function(key,value){
    var result = {};
    result[key+"_"] = value + "$";
    return result;
})
