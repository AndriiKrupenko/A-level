// Сделать задание на синий пояс, используя рекурсию, без ограничения вложенности. 
//(Сделать HTML - конструктор из деревянной структуры)
//------------------

let tr = {
    tr1: {td1: 'some text', td2: 'some text 2'},
}

let str

function htmlTree(obj, constrFunc) {
    str = "<table border=1>\n"

    for (key in tr) {
    str += "\t<tr>\n"

        for (key2 in tr[key]) {
            str += `\t\t<td>${tr[key][key2]}</td>\n`
        }

    str += "\t</tr>\n"
    }
    
    str += "</table>"
}

htmlTree(tr)
console.log(str)


