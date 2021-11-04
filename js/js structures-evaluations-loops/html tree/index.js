// // <body>
//         <div>
//             <span>Enter a data please:</span><br/>
//             <input type='text' id='name'>
//             <input type='text' id='surname'>
//         </div>
//         <div>
//             <button id='ok'>OK</button>
//             <button id='cancel'>Cancel</button>
//         </div>
//     </body>
//------------------
// Сделайте декларативную JSON-структуру для тэгов выше, в которой:
// каждый тэг будет объектом
// имя тэга будет полем tagName
// вложенные тэги будут в поле subTags
// текст в тэге будет в поле text
// набор аттрибутов тэга будет в поле attrs.
//------------------
// Выведите значения текста во второй кнопке, используя . и [].
// Выведите значение атрибута id во втором input, используя . и [].
//------------------

let body = {
    tagName: 'body',
    attrs: {},
    paired: true,
    children: [
        {
            tagName: 'div',
            attrs: {},
            paired: true,
            children: [
                {
                    tagName: 'span',
                    attrs: {},
                    paired: true,
                    text: 'Enter a data please'
                },
                {
                    tagName: 'br',
                    attrs: {},
                    paired: false
                },
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'name'
                    },
                    paired: true
                },
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'surname'
                    },
                    paired: true
                }
            ]
        },
        {
            tagName: 'div',
            attrs: {},
            paired: true,
            children: [
                {
                    tagName: 'button',
                    attrs: {
                        id: 'ok'
                    },
                    paired: true,
                    text: 'OK'
                },
                {
                    tagName: 'button',
                    attrs: {
                        id: 'cancel'
                    },
                    paired: true,
                    text: 'Cancel'
                }
            ]
        }
    ]
}

console.log(body.children[1].children[1].text)
console.log(body.children[0].children[3].attrs.id)