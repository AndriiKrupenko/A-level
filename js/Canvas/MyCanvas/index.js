// 
//------------------
// var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.onclick = (e) => { 
    // console.log(e)
    ctx.beginPath()
    ctx.arc(e.layerX, e.layerY, size.value, 0, 2 * Math.PI)
    ctx.fillStyle = color.value
    ctx.fill()
    ctx.stroke()
}