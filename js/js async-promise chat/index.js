// Используя функцию jsonPost на адрес http://students.a-level.com.ua:10012 напишите чат-клиент, который:
//------------------
// Stage 1
//------------------
// Отправляет сообщения в чат. Для проверки отслеживайте приходящий с сервера nextMessageId, который должен увеличиваться. Интерфейс: поле ввода ника, поле ввода сообщения, кнопка отправки.
//------------------
// function jsonPost(url, data)
// {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();   
//         x.onerror = () => reject(new Error('jsonPost failed'))
//         //x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))

//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
//                 resolve(JSON.parse(x.responseText))
//             }
//             else if (x.status != 200){
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }

let nick = document.createElement('input')
nick.setAttribute('placeholder', 'nick')
document.body.appendChild(nick)
let br = document.createElement('br')
document.body.appendChild(br)
let message = document.createElement('input')
message.style.marginTop = '5px'
message.setAttribute('placeholder', 'message')
document.body.appendChild(message)
let br2 = document.createElement('br')
document.body.appendChild(br2)
let button = document.createElement('button')
document.body.appendChild(button)
button.style.marginTop = '5px'
button.style.marginBottom = '15px'
button.innerText = 'Send'

nick.oninput = (e) => { nick.value + e.data }

message.oninput = (e) => { message.value + e.data }

// button.onclick = () => {
//     jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick.value, message: message.value }).then(res => console.log(res.nextMessageId))
// }

//------------------
// Stage 2
//------------------
// Читает все сообщения из чата и выводит их в отдельном контейнере. Интерфейс: некий div-контейнер, в котором на каждое сообщение создается div (или иной блочный контейнерный тэг) и в него помещается ник и сообщение. Также там есть timestamp который может показывать время отправки сообщения.
//------------------

let mainDiv = document.createElement('div')
document.body.appendChild(mainDiv)

let lastMessageId

jsonPost("http://students.a-level.com.ua:10012", {func: 'getMessages'})
    .then(res => {
        lastMessageId = res.nextMessageId
        for (let message of res.data.reverse()) {
            let div = document.createElement('div')
            mainDiv.append(div)
            let nickSpan = document.createElement('span')
            nickSpan.innerText = `${message.nick}: `
            div.append(nickSpan)
            let messageSpan = document.createElement('span')
            messageSpan.innerText = `${message.message} `
            div.append(messageSpan)
            let time = document.createElement('span')
            time.style.opacity = 0.6
            let timeConvert = new Date(message.timestamp)
            time.innerText = `Time: ${timeConvert}`
            div.append(time)
        }
    })

//------------------
// Stage 3
//------------------
// Читает только новые сообщения из чата. Для этого надо после каждого получения запоминать nextMessageId и отправлять его при следующем запросе новых сообщений. Изначально nextMessageId равен нулю, что бы вычитать всю историю сообщений с сервера.
//------------------

// button.onclick = () => {
//     jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick.value, message: message.value }).then(res => console.log(res)).then(
//         jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: lastMessageId })
//             .then(res => {
//                 for (let message of res.data) {
//                 let div = document.createElement('div')
//                 mainDiv.prepend(div) 
//                 let time = document.createElement('span')
//                 time.style.opacity = 0.6
//                 let timeConvert = new Date(message.timestamp)
//                 time.innerText = `Time: ${timeConvert}`
//                 div.prepend(time)
//                 let messageSpan = document.createElement('span')
//                 messageSpan.innerText = `${message.message} `
//                 div.prepend(messageSpan)
//                 let nickSpan = document.createElement('span')
//                 nickSpan.innerText = `${message.nick}: `
//                 div.prepend(nickSpan)
//                 }
//                 lastMessageId = res.nextMessageId
//             }))
// }

//------------------
// Stage 4
//------------------
// Делаем Stage 3 в setInterval для периодической проверки сообщений (раз в 2 -5 секунд).
//------------------

// setInterval(() => 
//     jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: lastMessageId })
//             .then(res => {
//                 for (let message of res.data) {
//                 let div = document.createElement('div')
//                 mainDiv.prepend(div) 
//                 let time = document.createElement('span')
//                 time.style.opacity = 0.6
//                 let timeConvert = new Date(message.timestamp)
//                 time.innerText = `Time: ${timeConvert}`
//                 div.prepend(time)
//                 let messageSpan = document.createElement('span')
//                 messageSpan.innerText = `${message.message} `
//                 div.prepend(messageSpan)
//                 let nickSpan = document.createElement('span')
//                 nickSpan.innerText = `${message.nick}: `
//                 div.prepend(nickSpan)
//                 }
//                 lastMessageId = res.nextMessageId
//             })
//     , 5000)

//------------------
// Stage 5
//------------------
// Напишите асинхронную функцию отправки, которая внутри себя будет делать два запроса: на отправку и на проверку, для того что бы минимизировать задержку между отправкой сообщения пользователя и его появлением в окне чата. Оформите отдельно функции отправки и проверки новых сообщений как асинхронные (async, возвращает Promise):
// async function sendMessage(nick, message) отсылает сообщение.
// async function getMessages() получает сообщения и отрисовывает их в DOM
// async function sendAndCheck() использует две предыдущие для минимизации задержки между отправкой сообщения и приходом их. Именно эта функция должна запускаться по кнопке.
// async function checkLoop() использует delay и бесконечный цикл для периодического запуска getMessages().
//------------------

async function sendMessage(nick, message) {
    return jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', "nick": nick, "message": message })
}

async function getMessages() {
    jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: lastMessageId })
        .then(res => {
            for (let message of res.data) {
            let div = document.createElement('div')
            mainDiv.prepend(div) 
            let time = document.createElement('span')
            time.style.opacity = 0.6
            let timeConvert = new Date(message.timestamp)
            time.innerText = `Time: ${timeConvert}`
            div.prepend(time)
            let messageSpan = document.createElement('span')
            messageSpan.innerText = `${message.message} `
            div.prepend(messageSpan)
            let nickSpan = document.createElement('span')
            nickSpan.innerText = `${message.nick}: `
            div.prepend(nickSpan)
            }
            lastMessageId = res.nextMessageId
        })
}

async function sendAndCheck() {
    await sendMessage(nick.value, message.value)
    await getMessages()
}

async function checkLoop() {
    setInterval(() => getMessages(), 5000)
}

checkLoop()

button.onclick = () => {
    sendAndCheck()
}

//------------------
// Stage 6
//------------------
// Прогуглить и разобраться с fetch и заменить внутренности jsonPost на код, использующий fetch вместо XMLHttpRequest.
//------------------

function jsonPost(url, data) {
    // const headers = {
    //     'Content-Type': 'application/json'
    // }

    return fetch(url, {
        method: "POST",
        // headers: headers,
        body: JSON.stringify(data)   
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        } else {
            return res.json().then(() => new Error('status is not 200'))
        }
    }).catch(error => console.log(error))

}