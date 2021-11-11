// Подсветить строку и столбец, в которой находится подсвеченная ячейка. Используйте parentElement (родительский элемент элемента DOM), и список его детей: children.
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
                for (key of this.parentElement.children) {
                    key.style.backgroundColor = 'yellow'
                }
                for (tr of this.parentElement.parentElement.children) {
                    for (td of tr.cells) {
                        if (td.cellIndex == this.cellIndex) {
                            td.style.backgroundColor = 'yellow'
                        }
                    }
                }
                this.style.backgroundColor = 'red'
            }
            td.onmouseout = function(){
                for (key of this.parentElement.children) {
                    key.style.backgroundColor = '#fcfcfc'
                }
                for (tr of this.parentElement.parentElement.children) {
                    for (td of tr.cells) {
                        if (td.cellIndex == this.cellIndex) {
                            if (tr.rowIndex % 2 == 0) {
                                td.style.backgroundColor = '#fcfcfc'
                            } else {
                                td.style.backgroundColor = '#f1f1f1'
                            }
                        }
                    }
                }
            }
        } else {
            td = document.createElement("td")
            td.innerText = `${arr[i][j]}`
            td.style.backgroundColor = '#f1f1f1'
            td.style.borderColor = 'grey'
            tr.appendChild(td)
            td.onmouseover = function(){
                for (key of this.parentElement.children) {
                    key.style.backgroundColor = 'yellow'
                }
                for (tr of this.parentElement.parentElement.children) {
                    for (td of tr.cells) {
                        if (td.cellIndex == this.cellIndex) {
                            td.style.backgroundColor = 'yellow'
                        }
                    }
                }
                this.style.backgroundColor = 'red'
            }
            td.onmouseout = function(){
                for (key of this.parentElement.children) {
                    key.style.backgroundColor = '#f1f1f1'
                }
                for (tr of this.parentElement.parentElement.children) {
                    for (td of tr.cells) {
                        if (td.cellIndex == this.cellIndex) {
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
    }
}

document.body.append(table)
