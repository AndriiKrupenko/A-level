// Напишите функцию конструктор Password, которая будет в родительском элементе создавать поле ввода для пароля и кнопку/иконку/чекбокс, который будет переключать режим просмотра пароля в поле ввода.
//------------------
// Параметры:
// parent - родительский элемент
// open - стартовое состояние
// Методы:
// setValue/getValue - задают/читают значения
// setOpen/getOpen - задают/читают открытость текста в поле ввода
// Колбэки (функции обратного вызова, данные изнутри объекта):
// onChange - запускается по событию oninput в поле ввода, передает текст наружу
// onOpenChange - запускается по изменению состояния открытости пароля
//------------------

function Password(parent, open) {
    let input = document.createElement('input')
    parent.appendChild(input)

    let check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    parent.appendChild(check)

    check.checked = open

    if (check.checked) {
        check.setAttribute('checked', '')
        input.setAttribute('type', 'text')
    } else {
        input.setAttribute('type', 'password')
    }

    this.setValue = newValue => {
        input.value = newValue
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
p.onOpenChange = open => console.log(open)

p.setValue('qwerty')
console.log(p.getValue())

p.setOpen(false)
console.log(p.getOpen())



