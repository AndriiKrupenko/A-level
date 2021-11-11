// Подсветить ячейку над которой находится курсор мыши. Используйте события mouseover и mouseout, и style.backgroundColor для подсветки.
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

let tr, td

for (i = 0; i < 10; i++) {
    tr = document.createElement("tr")
    table.appendChild(tr)
    for (j = 0; j < 10; j++) {
        if (i % 2 == 0) {
            td = document.createElement("td")
            td.innerText = `${arr[i][j]}`
            td.style.backgroundColor = '#fcfcfc'
            td.style.borderColor = 'grey'
            tr.appendChild(td)
            td.onmouseover = function(){
                this.style.backgroundColor = 'yellow'
            }
            td.onmouseout = function(){
                this.style.backgroundColor = '#fcfcfc'
            }
        } else {
            td = document.createElement("td")
            td.innerText = `${arr[i][j]}`
            td.style.backgroundColor = '#f1f1f1'
            td.style.borderColor = 'grey'
            tr.appendChild(td)
            td.onmouseover = function(){
                this.style.backgroundColor = 'yellow'
            }
            td.onmouseout = function(){
                this.style.backgroundColor = '#f1f1f1'
            }
        }    
    }
}

document.body.append(table)

