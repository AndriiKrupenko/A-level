// переписать таблица/подсветка на замыканиях (вместо tr или td - this, вместо rowIndex, cellIndex - i, j)
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
            console.log()
            for (row of table.children) {
                for (cell of row.cells) {
                    if (cell.parentElement === this.parentElement) {
                        cell.style.backgroundColor = 'yellow'
                    }
                    if (cell.cellIndex === j) {
                        cell.style.backgroundColor = 'yellow'
                    }
                }
            }
            this.style.backgroundColor = 'red'
        }
        td.onmouseout = function(){
            for (row of table.children) {
                for (cell of row.cells) {
                    if (row.rowIndex % 2 == 0) {
                        cell.style.backgroundColor = '#fcfcfc'
                    } else {
                        cell.style.backgroundColor = '#f1f1f1'
                    }
                }
            }
        }
    }
}

document.body.append(table)
