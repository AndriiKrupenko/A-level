function Control(el,
    { value = 0,
    min=0, 
    max=100, 
    minAngle=0,
    maxAngle=360, 
    wheelSpeed=0.1,
    step=1}={}) {

    const img = document.createElement('img')
    img.src   = '1@3x.png'
    el.append(img)

    const ratio = (maxAngle - minAngle) / (max - min)
    const getAngle = () => (value - min)*ratio + minAngle

    this.setValue = newValue => { //проверить, вдруг в этом объекте есть onchange
        if (newValue > max){
            newValue = max
        }
        if (newValue < min){
            newValue = min
        }
        if (this.onchange) {
            this.onchange(newValue)
        }
        value = newValue //и запустить его с новым value
        img.style.transform = `rotate(${getAngle()}deg)`
    }

    img.onmousewheel = e => {
        const {deltaY} = e

        const newValue = value + deltaY*wheelSpeed
        this.setValue(newValue)

        e.preventDefault()
    }

    img.onclick = e => {
        console.log(e, img.width)
        const {layerX} = e
        const {width} = img
        if (layerX > width/2){
            this.setValue(value +step)
        }
        else {
            this.setValue(value -step)
        }
        //найти координаты относительно img
        //найти, левее или правее центра происходит клик
        //если правее - сделать setValue(value +step)
        //если левее - сделать setValue(value -step)
    }

    const toDeg = rad => ((rad * 180)/Math.PI + 360 + 90) % 360

    let prevMouseAngle = null

    img.onmousedown = e => {
        const y = e.layerY - img.height/2
        const x = e.layerX - img.width/2
        prevMouseAngle = toDeg(Math.atan2(y, x)) 

        //console.log(x,y, getAngle(), prevMouseAngle,  prevMouseAngle - getAngle())

        e.preventDefault()
    }

    img.onmousemove = e => {
        if (prevMouseAngle === null) return 

        const y = e.layerY - img.height/2
        const x = e.layerX - img.width/2
        let currentAngle = toDeg(Math.atan2(y, x)) 
        let moveAngleDiff = (currentAngle - prevMouseAngle)
        this.setValue(value + moveAngleDiff/ratio)
        prevMouseAngle = currentAngle
    }

    img.onmouseout = img.onmouseup = () => {
        prevMouseAngle = null
    }

    this.setValue(value)
    
}

//----------------------
let audio = document.createElement('audio')
document.body.appendChild(audio)
audio.setAttribute('controls', '')
audio.setAttribute('autoplay', '')
let source = document.createElement('source')
audio.append(source)
source.setAttribute('src', 'audio.mp3')
audio.style.paddingLeft = "50px"

const volumeControl  = new Control(container1, {value: 50, min: 0, max: 100, minAngle: -90, maxAngle: 90})
volumeControl.onchange = value => { console.log(value); audio.volume = 0.01 * value } //на каждый setValue
//console.log(volumeControl.getValue())
//пришейте к нему тэг audio для громкости


//----------------------
function setRGB(value, colorName){
    //какой то блок, которому меняем цвет через rgba и цвета крутилок
    if (`${colorName}` == "redValue") {
        redValue = value
    } else if (`${colorName}` == "greenValue") {
        greenValue = value
    } else {
        blueValue = value
    }

    document.body.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

let redValue = 0
let greenValue = 0
let blueValue = 0

const red = new Control(container1, { min: 0, max: 255 })
red.onchange = value => setRGB(value, "redValue")

const green = new Control(container1, { min: 0, max: 255 })
green.onchange = value => setRGB(value, "greenValue")

const blue = new Control(container1, { min: 0, max: 255 })
blue.onchange = value => setRGB(value, "blueValue")


//const red  = new Control(container1, {min: 0, max: 255})
//volumeControl.onchange = setRGB
//const green  = new Control(container1, {min: 0, max: 255})
//volumeControl.onchange = setRGB
//const blue  = new Control(container1, {min: 0, max: 255})
//volumeControl.onchange = setRGB

////сделать три крутилки для RGB
////и обновлять цвет блока/фона блока при вращении любой из трех



//------Ниже решение без функции setRGB --------

// const red = new Control(container1, { min: 0, max: 255 })
// let redValue = 0;
// red.onchange = value => {
//     redValue = value;
//     document.body.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
//     console.log(redValue)
//     console.log(greenValue)
//     console.log(blueValue)
// }
// const green = new Control(container1, { min: 0, max: 255 })
// let greenValue = 0;
// green.onchange = value => {
//     greenValue = value;
//     document.body.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
// }
// const blue = new Control(container1, { min: 0, max: 255 })
// let blueValue = 0;
// blue.onchange = value => {
//     blueValue = value;
//     document.body.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
// }
