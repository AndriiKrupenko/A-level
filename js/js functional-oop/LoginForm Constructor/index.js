// оформите предыдущую задачу как функцию-конструктор. Продумайте и предусмотрите геттеры, сеттеры и колбэки.
//------------------

function Password(parent, open) {
    let inputLogin = document.createElement('input')
    parent.appendChild(inputLogin)
    inputLogin.setAttribute('placeholder', 'Login')
    inputLogin.style.marginBottom = '10px'

    let br = document.createElement('br')
    parent.appendChild(br)

    let input = document.createElement('input')
    parent.appendChild(input)
    input.setAttribute('placeholder', 'Password')
    input.style.marginBottom = '10px'

    let check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    parent.appendChild(check)
    
    let br2 = document.createElement('br')
    parent.appendChild(br2)

    let button = document.createElement('button')
    button.innerText = 'Войти'
    parent.appendChild(button)

    check.checked = open

    if (!input.value || !inputLogin.value) {
        button.setAttribute('disabled', '')
    }

    if (check.checked) {
        check.setAttribute('checked', '')
        input.setAttribute('type', 'text')
    } else {
        input.setAttribute('type', 'password')
    }

    this.setLoginValue = newValue => {
        inputLogin.value = newValue
        if (!input.value || !inputLogin.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    this.getLoginValue = () => inputLogin.value
    
    this.setValue = newValue => {
        input.value = newValue
        if (!input.value || !inputLogin.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    this.getValue = () => input.value

    this.setOpen = checkedBoolean => {
        check.checked = checkedBoolean
        if (checkedBoolean) {
            this.onOpenChange(checkedBoolean)
        }
        if (check.checked) {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    this.getOpen = () => check.checked

    input.oninput = () => {
        this.onChange(input.value)
        if (!input.value || !inputLogin.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    inputLogin.oninput = () => {
        this.onLoginChange(inputLogin.value)
        if (!input.value || !inputLogin.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    check.onchange = () => {
        if (check.checked) {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
        this.onOpenChange(check.checked)
    }
}

let p = new Password(document.body, true)

p.onChange = data => console.log(data)
p.onLoginChange = data => console.log(data)
p.onOpenChange = open => console.log(open)


p.setLoginValue('Andrii')
console.log(p.getLoginValue())

p.setValue('qwerty')
console.log(p.getValue())

p.setOpen(false)
console.log(p.getOpen())


