function clickCounter(element) {
    let count = 0

    element.onclick = function () {
        count++
        element.innerText = count
    }
}

clickCounter(button1)
clickCounter(button2)
