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

    this.okCallback     = okCallback
    this.cancelCallback = cancelCallback

    this.data           = data
    this.validators = {}

    let inputCreators = {
        String(key, value, oninput) {
            let input = document.createElement('input')
                input.type = 'text'
                input.placeholder = key
                input.value = value
                input.oninput     = () => oninput(input.value)
                if (key[0] == "*") {
                  input.setAttribute('required', 'required')  
                }
                let valueValidate = () => {
                    for (key of value.split("")) {
                        if (key != "*") {
                            return false
                        }
                    }
                    return true
                }
                if (valueValidate() === true) {
                    input.value = ""
                }

                return input
            },
        Boolean(key, value, oninput) {
            let input = document.createElement('input')
                input.type = 'checkbox'
                input.placeholder = key
                input.checked = value
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
            },
    }

    for (let key in data) {
        let tr = document.createElement('tr')
        table.append(tr)
        let th = document.createElement('th')
        if (key[0] == "*") {
            let label = document.createElement('label')
            label.innerText = key.substr(0, 1)
            label.style.color = 'red'
            let nbsp = ' '
            th.append(label)
            th.append(nbsp)
            th.append(key.substr(1))
        } else {
            th.innerText = key
        }
        tr.append(th)
        let td = document.createElement('td')
        tr.append(td)
        let inputError = document.createElement('span')

        let input = inputCreators[data[key].constructor.name](
            key,
            data[key],
            (e) => {
                data[key] = e

                if (this.validators[key]) {
                    if (this.validators[key](data[key], key, data, input) === true) {
                        input.style.backgroundColor = 'white'
                        inputError.innerText = ''
                    } else {
                        inputError.innerText = this.validators[key](data[key], key, data, input)
                        input.style.backgroundColor = '#FF6347'
                    }
                }

                if (key[0] == "*") {
                    input.setAttribute('required', 'required')
                    if (data[key] == null || data[key] == "") {
                        input.style.backgroundColor = '#FF6347'
                    } else {
                        input.style.backgroundColor = 'white'
                    }
                }
                
        })
        td.append(input)
        td.append(inputError)
    }

    if (typeof okCallback === 'function'){
        formBody.appendChild(okButton);
        okButton.onclick = () => {
            let errorArr = document.getElementsByTagName('span')
            let sendValidate = () => {
                for (key of errorArr) {
                    if (key.innerHTML != "") {
                        return false
                    }
                }
                return true
            }
            if (sendValidate() == true) {
                this.okCallback(this.data)
            } else {
                console.log('Error')
            }
        }
    }

    let defaultData = {};
    (function defaultDataCreator(data) {
        for (let key in data) {
           defaultData[key] = data[key] 
        }
    })(this.data)

    if (typeof cancelCallback === 'function'){
        formBody.appendChild(cancelButton);
        // cancelButton.onclick = cancelCallback
        cancelButton.onclick = () => {
            this.data = defaultData
            let inputs = document.getElementsByTagName('input')
            for (let input of inputs) {
                for (let key in this.data) {
                    if (input.placeholder == key) {
                        input.value = this.data[key]
                        input.checked = this.data[key]
                        let valueValidate = () => {
                            for (key of input.value.split("")) {
                                if (key != "*") {
                                    return false
                                }
                            }
                            return true
                        }
                        if (valueValidate() === true) {
                            input.value = ""
                        }
                        if (input.type == 'datetime-local') {
                            input.value = new Date(this.data[key]).toISOString().slice(0, -1)
                        }
                    }
                }
            }
        }
    }

    el.appendChild(formBody)
   
}


let form = new Form(
    formContainer,
    {
    "*name": 'Anakin',
    surname: 'Skywalker',
    married: true,
    password: '*****',
    birthday: new Date((new Date).getTime() - 86400000 * 30*365)
    },
    (data) => console.log(data),
    () => console.log('cancel')
)

form.okCallback = (data) => console.log(data)

form.validators.surname = (value, key, data, input) => value.length > 2 && value[0].toUpperCase() == value[0] && !value.includes(' ') ? true : 'Wrong name'

console.log(form)

