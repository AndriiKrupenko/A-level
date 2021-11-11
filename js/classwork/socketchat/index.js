let nick = document.getElementById('nick')
let message = document.getElementById('message')
let buttonSend = document.getElementById('button')
socket.emit(/*'msg', { nick: nick.value, message: message.value }*/)
buttonSend.onclick = function () {
    socket.emit('msg', { nick: nick.value, message: message.value })
}
let history = document.getElementById('history')
socket.on('msg', msg => history.innerHTML += `<p>${msg.nick} ${msg.message}</p>`)