//Синий пояс
//Сделайте калькулятор, который позволит вам исходя из информации о количества этажей в доме и количества квартир на этаже находить подъезд и этаж определенной квартиры по её номеру. Например для 9этажного дома по 4 квартиры на этаж 81 квартира находится на 3м этаже третьего подъезда.
//--------------

let porch;
let floor;
let floors = +prompt('Сколько этажей в доме?')
let flatsOnFloor = +prompt('Сколько квартир на этаже?')
let flat = +prompt('Какой номер квартиры?')

let flatsInPorch = floors * flatsOnFloor
let flatsInLastPorch = flat % flatsInPorch

if (flat % flatsInPorch == 0) {
    porch = flat / flatsInPorch
    floor = floors
} else if (flatsInLastPorch % flatsOnFloor == 0) {
    porch = Math.trunc(flat / flatsInPorch) + 1
    floor = flatsInLastPorch / flatsOnFloor
} else {
    porch = Math.trunc(flat / flatsInPorch) + 1
    floor = Math.trunc(flatsInLastPorch / flatsOnFloor) + 1
}

alert(`Подъезд: ${porch}, этаж: ${floor}`)