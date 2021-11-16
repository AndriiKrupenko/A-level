// Сделать задание на синий пояс, используя рекурсию, без ограничения вложенности. 
//(Сделать HTML - конструктор из деревянной структуры)
//------------------

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

//------------------

let str = ''

function treeConstructor(parent, level = 0) {
    let attrsStr = ''
    for (key in parent.attrs) {
        attrsStr += `${key}='${parent.attrs[key]}' `
    }
    str = "    ".repeat(level) + `<${parent.tagName} ${attrsStr}>\n`

    for (let child of parent.children) {
        if (child.children) {
            str += treeConstructor(child, level + 1) 
        }
        if (child.text) {
            str += "    ".repeat(level + 1) + `<${child.tagName}>${child.text}</${child.tagName}>\n`
        } 
    }
    
    str += "    ".repeat(level) + `</${parent.tagName}>\n`
    return str
}

treeConstructor(someTree)

console.log(str)
