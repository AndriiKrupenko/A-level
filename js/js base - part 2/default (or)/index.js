// Используя ИЛИ || добавьте имена по умолчанию, которые будут сохраняться во внутренних переменных если пользователь ввел пустую строку или нажал "Отмена". Например, если вы на шаге ввода Фамилии нажмете Escape, фамилия будет "Иванов"
//------------------

let surname = prompt('введите фамилию') || "Иванов"
let name = prompt('введите имя') || "Иван"
let patronymic = prompt('введите отчество') || "Иванович"
alert(`${surname} ${name} ${patronymic}`)
