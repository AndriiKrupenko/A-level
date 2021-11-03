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