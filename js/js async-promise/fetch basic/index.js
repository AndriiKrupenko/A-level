// С помощью следующего кода считать и вывести информацию о Люке Скайвокере:
//------------------
// fetch('https://swapi.dev/api/people/1/')
//   .then(res => res.json())
//   .then(luke => console.log(luke))
// Напишите функцию для отображения любого JSON в форме таблицы. Функция должна принимать два параметра:
// DOM - элемент, в котором строится таблица
// JSON, который нужно отобразить.
//------------------

let div = document.createElement('div')
document.body.appendChild(div)
div.setAttribute('id', 'formContainer')

function objectCreator(el, data) {
    let table = document.createElement('table')

    for (key in data) {
        let tr = document.createElement('tr')
        table.append(tr)
        let th = document.createElement('th')
        th.innerText = key
        tr.append(th)
        let td = document.createElement('td')
        td.innerText = data[key]
        tr.append(td)
    }

    el.append(table)
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => { objectCreator(formContainer, luke); console.log(luke) })




