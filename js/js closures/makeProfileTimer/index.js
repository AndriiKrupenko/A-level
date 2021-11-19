// Напишите функцию makeProfileTimer, которая служит для замера времени выполнения другого кода и работает следующим образом:
//    var timer = makeProfileTimer()
//    alert('Замеряем время работы этого alert');  //некий код, время выполнения которого мы хотим измерить с высокой точностью
//    alert(timer()); //alert должен вывести время в микросекундах от выполнения makeProfileTimer до момента вызова timer(), 
//                    // т. е. измерить время выполнения alert
// Используйте performance.now()
//------------------

function makeProfileTimer() {
    let t0 = performance.now()

    return function (){
    let t1 = performance.now()
    return t1-t0
  }
}

var timer = makeProfileTimer()

alert('Замеряем время работы этого alert')

alert(timer())

