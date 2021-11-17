let div = document.createElement('div')
document.body.appendChild(div)
div.setAttribute('id', 'formContainer')

function Form(el, data, okCallback, cancelCallback) {
    let formBody = document.createElement('div')
    let okButton = document.createElement('button')
    okButton.innerHTML = 'OK'

    let cancelButton = document.createElement('button')
    cancelButton.innerHTML = 'Cancel'

    let table = document.createElement('table')
    formBody.append(table)

    let inputCreators = {
        String(key, value, oninput){
                let input = document.createElement('input')
                input.type = 'text'
                input.placeholder = key
                input.value       = value
                input.oninput     = () => oninput(input.value)
                return input
            },
        Boolean(key, value, oninput) {
                let input = document.createElement('input')
                input.type = 'checkbox'
                input.placeholder = key
                input.value       = value
                input.oninput     = () => oninput(input.checked)
                //label for с input type='checkbox' внутри
                return input
            },
        Date(key, value, oninput) {
                let input = document.createElement('input')
                input.type = 'datetime-local'
                input.placeholder = key
                input.value       = new Date(value).toISOString().slice(0, -1)
                input.oninput     = () => oninput(new Date(input.value))
                return input
                //используйте datetime-local
            },
        //     и др. по вкусу, например textarea для длинных строк
    }

    for (let key in data) {
        let tr = document.createElement('tr')
        table.append(tr)
        let th = document.createElement('th')
        th.innerText = key
        tr.append(th)
        let td = document.createElement('td')
        tr.append(td)

        let input = inputCreators[data[key].constructor.name](key, data[key], (e)=> data[key] = e )
        td.append(input)   
    }

    if (typeof okCallback === 'function'){
        formBody.appendChild(okButton);
        okButton.onclick = (e) => {
            console.log(this)
            this.okCallback(e)
        }
    }

    if (typeof cancelCallback === 'function'){
        formBody.appendChild(cancelButton);
        cancelButton.onclick = cancelCallback
    }

    el.appendChild(formBody)

    this.okCallback     = okCallback
    this.cancelCallback = cancelCallback

    this.data           = data
    this.validators     = {}
}


let form = new Form(formContainer, {
    name: 'Anakin',
    surname: 'Skywalker',
    married: true,
    birthday: new Date((new Date).getTime() - 86400000 * 30*365)
}, () => console.log('ok'),() => console.log('cancel') )
form.okCallback = () => console.log('ok2')

