// Сделать таблицу умножения, используя DOM createElement и innerText. Создайте таблицу, вложенные строки и ячейки в циклах. 
//------------------

let arr = []
for (i = 0; i < 10; i++) {
    arr[i] = []
    for (j = 0; j < 10; j++) {
        if (i == 0) {
            arr[i][j] = j
        } else if (j == 0) {
            arr[i][j] = i
        } else {
            arr[i][j] = i * j
        }
    }
}

let table = document.createElement("table")

table.style.border = '0'
table.style.borderCollapse = 'separate'
table.rules = 'all'
table.cellPadding = '10'
table.cellSpacing = '3'

for (i = 0; i < 10; i++) {
    let tr = document.createElement("tr")
    table.appendChild(tr)
    for (j = 0; j < 10; j++) {
        if (i % 2 == 0) {
            let td = document.createElement("td")
            td.innerText = `${arr[i][j]}`
            td.style.backgroundColor = '#fcfcfc'
            td.style.borderColor = 'grey'
            tr.appendChild(td)
        } else {
            let td = document.createElement("td")
            td.innerText = `${arr[i][j]}`
            td.style.backgroundColor = '#f1f1f1'
            td.style.borderColor = 'grey'
            tr.appendChild(td)
        }    
    }
}

document.body.append(table)
