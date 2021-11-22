// С помощью Password сделайте пару инпутов, которые проверяют введеный пароль (в двух полях ввода) на совпадение. Кнопка должна активизироваться при совпадающих паролях. При открытом пароле второе поле вводы должно пропадать с экрана Таким образом:
// Когда Password в скрытом режиме - появляется второй инпут (<input type='password'>) с паролем в скрытом режиме
// Когда Password в открытом режиме - второй инпут пропадат
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

    let inputRepeatPassword = document.createElement('input')
    // parent.appendChild(inputRepeatPassword)
    inputRepeatPassword.setAttribute('type', 'password')
    inputRepeatPassword.setAttribute('placeholder', 'Repeat password')
    inputRepeatPassword.style.marginBottom = '10px'

    let br3 = document.createElement('br')
    // parent.appendChild(br3)

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
        parent.insertBefore(inputRepeatPassword, button)
        parent.insertBefore(br3, button)
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
        if (!input.value || !inputLogin.value || input.value != inputRepeatPassword.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    this.getValue = () => input.value

    this.setRepeatPasswordValue = newValue => {
        inputRepeatPassword.value = newValue
    }

    this.getRepeatPasswordValue = () => inputRepeatPassword.value

    this.setOpen = checkedBoolean => {
        check.checked = checkedBoolean
        if (checkedBoolean) {
            this.onOpenChange(checkedBoolean)
        }
        if (check.checked) {
            input.setAttribute('type', 'text')
            inputRepeatPassword.remove()
            br3.remove()
        } else {
            input.setAttribute('type', 'password')
            parent.insertBefore(inputRepeatPassword, button)
            parent.insertBefore(br3, button)
        }
    }

    this.getOpen = () => check.checked

    input.oninput = () => {
        this.onChange(input.value)
        if (!input.value || !inputLogin.value || input.value != inputRepeatPassword.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    inputLogin.oninput = () => {
        this.onLoginChange(inputLogin.value)
        if (!input.value || !inputLogin.value || input.value != inputRepeatPassword.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    inputRepeatPassword.oninput = () => {
        this.onRepeatPasswordChange(inputRepeatPassword.value)
        if (!input.value || !inputLogin.value || input.value != inputRepeatPassword.value) {
            button.setAttribute('disabled', '')
        } else {
            button.removeAttribute('disabled');
        }
    }

    check.onchange = () => {
        if (check.checked) {
            input.setAttribute('type', 'text')
            inputRepeatPassword.remove()
            br3.remove()
        } else {
            input.setAttribute('type', 'password')
            parent.insertBefore(inputRepeatPassword, button)
            parent.insertBefore(br3, button)
        }
        this.onOpenChange(check.checked)
    }
}

let p = new Password(document.body, true)

p.onChange = data => console.log(data)
p.onLoginChange = data => console.log(data)
p.onRepeatPasswordChange = data => console.log(data)
p.onOpenChange = open => console.log(open)


p.setLoginValue('Andrii')
console.log(p.getLoginValue())

p.setValue('qwerty')
console.log(p.getValue())

p.setRepeatPasswordValue('')
console.log(p.getRepeatPasswordValue())

p.setOpen(false)
console.log(p.getOpen())

