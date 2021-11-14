// Сделайтей функцию, которая приветствует всех, кто передан в качестве параметров.
// Вам поможет arguments и for
//------------------

function greetAll() {
    let names = ''
    for (key of arguments) {
        names += `${key}, `
    }
    names = names.slice(0, -2)
    alert(`Hello ${names}`)
}
