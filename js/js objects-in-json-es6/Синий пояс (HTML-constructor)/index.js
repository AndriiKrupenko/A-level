// Сделать HTML-конструктор из деревянной структуры, которая была на прошлом занятии:
// Для начала сделайте конструктор для верхнего уровня (в примере - table). Потом с помощью копипасты сделайте то же самое с вложенным уровнем nestedTags (tr). Аналогично для уровня td.
// Конструктор должен поддерживать вложенность до 3его уровня (как в примере). В результате работы конструктора из примера выше должен получиться следующий HTML(в строке str):
//------------------
// <table border=1>
//     <tr>
//         <td>some text</td>
//         <td>some text 2</td>
//     </tr>
// </table>
//------------------
// Переносы строк и отступы в результате не принципиальны, главное - структура HTML Проверьте ваш код на других структурах.
//------------------

// let tr = {
//     tr1: {td1: 'some text', td2: 'some text 2'},
// }


var someTree = {
    tagName: "table", 
    children: [ 
        {
            tagName: "tr",
            children: [
                {
                    tagName: "td",
                    text: "some text",
                },
                {
                    tagName: "td",
                    text: "some text 2",
                }
            ]
        }
    ],
    attrs: 
    {
        border: 1,
    },
}


let str = ''

function treeConstructor(obj) {
    let attrsStr = ''
    for (key in obj.attrs) {
        attrsStr += `${key}='${obj.attrs[key]}' `
    }
    str += `<${obj.tagName} ${attrsStr}>\n`
    for (child of obj.children) {
        str += `\t<${child.tagName}>\n`
        for (key of child.children) {
            str += `\t\t<${key.tagName}>${key.text}</${key.tagName}>\n`
        }
        str += `\t</${child.tagName}>\n`   
    }
    str += `</${obj.tagName}>`
}

treeConstructor(someTree)

console.log(str)





