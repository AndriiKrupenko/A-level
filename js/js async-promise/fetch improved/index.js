// Расширить функцию отображения:
// Если одно из полей строка или массив.
// Если строки или строка содержат в себе https://swapi.dev/api/
// То выводить вместо текста строки кнопку, при нажатии на которую:
// делается fetch данных по этой ссылке
// функция отображения запускает сама себя(рекурсивно) для отображения новых данных в том же элементе.
//------------------

let div = document.createElement('div')
document.body.appendChild(div)
div.setAttribute('id', 'formContainer')

function objectCreator(el, data) {
    let table = document.createElement('table')
    table.style.border = "1px solid black"

    for (key in data) {
        let tr = document.createElement('tr')
        table.append(tr)
        let th = document.createElement('th')
        tr.append(th)
        th.innerText = key
        let td = document.createElement('td')
        tr.append(td)
        if (data[key].constructor.name == 'Array') {
            for (let link of data[key]) {
                if (link.includes('https://swapi.dev/api/')) {
                    let button = document.createElement('button')
                    td.append(button)
                    button.style.width = "50px"
                    button.style.height = "20px"
                    button.onclick = () => {
                        fetch(`${link}`)
                            .then(res => res.json())
                            .then(obj => { objectCreator(formContainer, obj); console.log(obj) })
                    }
                    // button.setAttribute('onclick', `location.href='${link}'`)
                    button.innerText = "Link"
                }
            }
        } else if (data[key].includes('https://swapi.dev/api/')) {
            let button = document.createElement('button')
            td.append(button)
            button.style.width = "50px"
            button.style.height = "20px"
            button.onclick = () => {
                fetch(`${data[key]}`)
                    .then(res => res.json())
                    .then(obj => { objectCreator(formContainer, obj); console.log(obj) })
            }
            // button.setAttribute('onclick', `location.href='${data[key]}'`)
            button.innerText = "Link"
        } else {
            td.innerText = data[key]
        }
    }
    el.append(table)
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => { objectCreator(formContainer, luke); console.log(luke) })




