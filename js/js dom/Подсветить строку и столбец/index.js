// Подсветить строку и столбец, в которой находится подсвеченная ячейка. Используйте parentElement (родительский элемент элемента DOM), и список его детей: children.
//------------------

let table = document.createElement("table")
table.style.border = '0'
table.style.borderCollapse = 'separate'
table.rules = 'all'
table.cellPadding = '10'
table.cellSpacing = '3'

let arr = []
let tr, td

for (let i = 0; i < 10; i++) {
    arr[i] = []
    tr = document.createElement("tr")
    table.appendChild(tr)
    for (let j = 0; j < 10; j++) {
        if (i == 0) {
            arr[i][j] = j
        } else if (j == 0) {
            arr[i][j] = i
        } else {
            arr[i][j] = i * j
        }
        
        td = document.createElement("td")
        td.innerText = arr[i][j]
        td.style.borderColor = 'grey'
        if (i % 2 == 0) {
            td.style.backgroundColor = '#fcfcfc'
        } else {
            td.style.backgroundColor = '#f1f1f1' 
        }
        tr.appendChild(td)
            
        td.onmouseover = function () {
            for (tr of table.children) {
                for (td of tr.cells) {
                    if (td.parentElement === this.parentElement) {
                        td.style.backgroundColor = 'yellow'
                    }
                    if (td.cellIndex === this.cellIndex) {
                        td.style.backgroundColor = 'yellow'
                    }
                }
            }
            this.style.backgroundColor = 'red'
        }
        td.onmouseout = function(){
            for (tr of table.children) {
                for (td of tr.cells) {
                    if (tr.rowIndex % 2 == 0) {
                        td.style.backgroundColor = '#fcfcfc'
                    } else {
                        td.style.backgroundColor = '#f1f1f1'
                    }
                }
            }
        }
    }
}

document.body.append(table)
