import './App.scss'
import { useState, useEffect } from 'react'
import clockFace from './images/ClockFace.png'
import clockH from './images/ClockFace_H.png'
import clockM from './images/ClockFace_M.png'
import clockS from './images/ClockFace_S.png'

//---------------------------------------------------------------------------------------------------------
// Spoiler
//---------------------------------------------------------------------------------------------------------
// Реализуйте компонент Spoiler, скрывающий контент и открывающий его по клику. Компонент будет получать 3 пропс:
// header, который будет выводится всегда
// open, может быть true или false, если написать в JSX без значения, это значит open={true}
// вложенный контент, т. е. children, который отображается в открытом состоянии спойлера и не отображается в закрытом
// Изначально компонент имеет состояние переданное через пропс open По клику на <div> в котором будет отображаться header должно меняться состояние на противоположное Обеспечьте условие, которое будет показывать или нет children.
//---------------------------------------------------------------------------------------------------------

// const Spoiler = ({ header = "+", open, children }) => {
//     //напишите тут код
//   const [openContent, setOpenContent] = useState(open)
//   return (
//     <div onClick={ () => setOpenContent(openContent => !openContent)}>
//       {header}
//       {openContent && children}
//     </div>
//   )  
// }

// function App() {
//   return (
//     <div className="App">
//       <Spoiler header={<h1>Заголовок</h1>} open>
//           Контент 1
//           <p>
//               лорем ипсум траливали и тп.
//           </p>
//       </Spoiler>

//       <Spoiler>
//           <h2>Контент 2</h2>
//           <p>
//               лорем ипсум траливали и тп.
//           </p>
//       </Spoiler>
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// RangeInput
//---------------------------------------------------------------------------------------------------------
// Реализовать компонент RangeInput, отображающий обычный <input /> со следующими возможностями:
// prop min - минимальная длина строки в инпуте, если меньше - инпут становится красным
// prop max - максимальная длина строки в инпуте, если большe - инпут становится красным
// Используйте компонент-класс и setState для отслеживания и валидации длины инпута. Или useState
// <RangeInput min={2} max={10} />
//---------------------------------------------------------------------------------------------------------

// const RangeInput = ({ min, max }) => { 
//   const [length, setLength] = useState(0)
//   return (
//     (length < min || length > max) ? <input style={{ backgroundColor: 'red' }} onChange={e => setLength(e.target.value.length)} /> : <input style={{ backgroundColor: 'white' }} onChange={e => setLength(e.target.value.length)} />
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <RangeInput min={2} max={10} />
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// PasswordConfirm
//---------------------------------------------------------------------------------------------------------
// Реализовать компонент PasswordConfirm, отображающий два <input type='password'/> со следующими возможностями:
// prop min - минимальная длина пароля
// Используйте компонент-класс и setState для отслеживания и валидации совпадения паролей и проверки на длину.Или useState
// По желанию добавьте более хитрые валидации типа проверки на размеры буков и наличие цифр в пароле.
// <PasswordConfirm min={2} />
//---------------------------------------------------------------------------------------------------------

// const PasswordConfirm = ({ min }) => { 
//   const [password, setPassword] = useState('')
//   const [password2, setPassword2] = useState('')
//   let passwordOk = <p>Password OK</p>
//   let passwordWrong = <p>Password WRONG</p>
//   return (
//     <>
//       <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
//       <input type='password' value={password2} onChange={e => setPassword2(e.target.value)} />
//       { (password.length > min && password === password2) ? passwordOk : passwordWrong }
//     </>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <PasswordConfirm min={2} />
//     </div>
//   );
// }

// export default App;


//---------------------------------------------------------------------------------------------------------
// Timer
//---------------------------------------------------------------------------------------------------------
// Напишите компонент, в который передается через props количество секунд, а компонент при этом реализует обратный отсчет раз в секунду уменьшая количество секунд на 1. Останавливается на 0. Добавьте в компонент кнопку паузы.
// Компонент должен отображать часы, минуты и секунды.
//---------------------------------------------------------------------------------------------------------

//setTimeout
//---------------------------------------------------------------------------------------------------------
// const Timer = ({ sec }) => { 
//   const [time, setTime] = useState(sec)
//   const [pause, setPause] = useState(false)
  
//   time > 0 && !pause && setTimeout(() => {
//     setTime(time - 1)
//   }, 1000);

//   return (
//     <>
//       <h1>Timer</h1>
//       {/* {(time > 0 && !pause) ? <p>{time}</p> : <p>Pause</p>} */}
//       {time >= 0 && !pause && <p>{time}</p>}
//       {time > 0 && pause && <p>Pause</p>}
//       <button disabled={!(time)} onClick={() => setPause(!pause)}>Pause</button>
//     </>
//   )
// }

//setInterval, useEffect
//---------------------------------------------------------------------------------------------------------
// const Timer = ({ sec, ms=1000 }) => { 
//   const [time, setTime] = useState(sec)
//   const [pause, setPause] = useState(false)

//   const padTime = time => {
//     return String(time).length === 1 ? `0${time}` : `${time}`
//   }
  
//   const format = time => {
//     const hours = Math.floor(time / 60**2)
//     const minutes =  Math.floor(time / 60) % 60
//     const seconds = time % 60

//     return `${hours}:${padTime(minutes)}:${padTime(seconds)}`
//   }
  
//   useEffect(() => {
//     let interval = null
//     if (!pause && time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - 1)
//         // console.log(time)
//       }, ms)
//     } 
//     return () => {
//       clearInterval(interval)
//     }
//    }, [pause, time])

//   return (
//     <>
//       <h1>Timer</h1>
//       {time >= 0 && !pause && <p>{format(time)}</p>}
//       {time > 0 && pause && <p>Pause</p>}
//       <button disabled={!(time)} onClick={() => setPause(pause => !pause)}>Pause</button>
//     </>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <Timer sec={3605} />
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// TimerControl
//---------------------------------------------------------------------------------------------------------
// Напишите компонент, с тремя полями ввода (часы, минуты и секунды) и кнопкой Start, по которой будет стартовать компонент Timer
//---------------------------------------------------------------------------------------------------------

// const Timer = ({ sec, ms=1000 }) => { 
//   const [time, setTime] = useState(sec)
//   const [pause, setPause] = useState(false)
//   const [inputHours, setInputHours] = useState(0)
//   const [inputMinutes, setInputMinutes] = useState(0)
//   const [inputSeconds, setInputSeconds] = useState(0)

//   const padTime = time => {
//     return String(time).length === 1 ? `0${time}` : `${time}`
//   }
  
//   const format = time => {
//     const hours = Math.floor(time / 60**2)
//     const minutes =  Math.floor(time / 60) % 60
//     const seconds = time % 60

//     return `${hours}:${padTime(minutes)}:${padTime(seconds)}`
//   }
  
//   useEffect(() => {
//     let interval = null
//     if (!pause && time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - 1)
//         // console.log(time)
//       }, ms)
//     } 
//     return () => {
//       clearInterval(interval)
//     }
//    }, [pause, time])

//   return (
//     <>
//       <h1>Timer</h1>
//       {time >= 0 && !pause && <p>{format(time)}</p>}
//       {time > 0 && pause && <p>Pause</p>}
//       <input type='number' min="0" placeholder='hours' onChange={e => setInputHours(+e.target.value)} />
//       <input type='number' min="0" max="60" placeholder='minutes' onChange={e => setInputMinutes(+e.target.value)} />
//       <input type='number' min="0" max="60" placeholder='seconds' onChange={e => setInputSeconds(+e.target.value)} />
//       <button onClick={() => setTime(inputHours*60*60 + inputMinutes*60 + inputSeconds)}>Start</button>
//       <button disabled={!(time)} onClick={() => setPause(pause => !pause)}>Pause</button>
//     </>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <Timer sec={3605} />
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// TimerContainer
//---------------------------------------------------------------------------------------------------------
// const SecondsTimer = ({seconds}) => <h2>{seconds}</h2>

// SecondsTimer в данном случае играет роль presentation компонента, который сам ничего не умеет делать, а просто является шаблоном для отображения своих props в удобном для пользователя виде.
// Реализуйте контейнерный компонент, который будет обеспечивать состояние и логику для любого таймера:

// <TimerContainer seconds={1800} refresh={100} render={SecondsTimer}/>

// TimerContainer должен:
  // воспринимать три пропса:
    // seconds - секунды для обратного отсчета
    // refresh - периодичность обновления таймера в миллисекундах
    // render - компонент для отрисовки, которому передается текущее время
  // Время вычисляется не по количеству обновлений, а по разности между стартовым и текущим моментом. Иначе таймер будет очень неточен
  // так как JSX понимает переменные с маленькой буквы не как компоненты-функции, а как тэги HTML, переприсвойте props render в переменную с большой буквы и используйте её в JSX, как имя компонента, передавая пропс seconds.
// Так как при любом обновлении состояния функция-компонент, как и любая другая функция, запускается целиком используйте setInterval в useEffect
//---------------------------------------------------------------------------------------------------------

// const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>

// const TimerContainer = ({ seconds = 1000, refresh = 1000, render: Component }) => {
//   const [time, setTime] = useState(seconds)

//   useEffect(() => {
//     let interval = null
//     let t0 = performance.now()
//     if (time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - Math.floor((performance.now() - t0)/1000))
//       }, refresh)
//     } 
//     return () => {
//       clearInterval(interval)
//     }
//    }, [time])

//   return (
//     <Component seconds={time} />
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <TimerContainer seconds={1800} refresh={2000} render={SecondsTimer} />
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// LCD
//---------------------------------------------------------------------------------------------------------
// Сделайте из компонента Timer presentation компонент без state, прикрутите его к TimerContainer
//---------------------------------------------------------------------------------------------------------

// const Timer = ({ seconds }) => { 
//   const padTime = time => {
//     return String(time).length === 1 ? `0${time}` : `${time}`
//   }
  
//   const format = time => {
//     const hours = Math.floor(time / 60**2)
//     const minutes =  Math.floor(time / 60) % 60
//     const seconds = time % 60

//     return `${hours}:${padTime(minutes)}:${padTime(seconds)}`
//   }

//   return (
//     <>
//       <h1>Timer</h1>
//       <h2>{seconds >= 0 && <p>{format(seconds)}</p>}</h2>
//     </>
//   )
// }

// const TimerContainer = ({ seconds = 1000, refresh = 1000, render: Component }) => {
//   const [time, setTime] = useState(seconds)

//   useEffect(() => {
//     let interval = null
//     let t0 = performance.now()
//     if (time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - Math.floor((performance.now() - t0)/1000))
//         // console.log(time)
//       }, refresh)
//     } 
//     return () => {
//       clearInterval(interval)
//     }
//    }, [time])

//   return (
//     <Component seconds={time} />
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <TimerContainer seconds={3605} refresh={2000} render={Timer} />
//     </div>
//   );
// }

// export default App;



//---------------------------------------------------------------------------------------------------------
// Watch
//---------------------------------------------------------------------------------------------------------
// Реализуйте часы со стрелками в качестве presentation компонента:
// квадратный блок-контейнер
// стрелки и, возможно, цифры позиционируются с помощью transform: rotate(УГОЛdeg)
// В верстке используйте position absolute для накладывания блоков стрелок и цифр друг на друга (это даст общий центр вращения)
// для корректного центра вращения блок со стрелкой или цифрой должен быть шириной с родительский квадратный блок
// есть еще всякий css (text-orientation) для вращения цифр внутри повернутого блока
//---------------------------------------------------------------------------------------------------------

const Timer = ({ seconds=1000 }) => { 
  
    const hoursArrow = (seconds / 60**2)*30
    const minutesArrow =  ((seconds / 60) % 60)*6
    const secondsArrow = (seconds % 60)*6

  return (
      <div className='WatchContainer'>
        <img src={clockFace} />
        <img src={clockH} style={{ transform: `rotate(${hoursArrow}deg)` }} />
        <img src={clockM} style={{ transform: `rotate(${minutesArrow}deg)` }} />
        <img src={clockS} style={{ transform: `rotate(${secondsArrow}deg)` }} />
      </div>
  )
}

const TimerContainer = ({ seconds = 1000, refresh = 1000, render: Component }) => {
  const [time, setTime] = useState(seconds)

  useEffect(() => {
    let interval = null
    let t0 = performance.now()
    if (time > 0) {
      interval = setInterval(() => {
        setTime(time => time + (performance.now() - t0)/1000)
        // console.log(time)
      }, refresh)
    } 
    return () => {
      clearInterval(interval)
    }
   }, [time])

  return (
    <Component seconds={time} />
  )
}

function App() {
  return (
    <div className="App">
      <TimerContainer seconds={7200 + Date.now()/1000} refresh={10} render={Timer} />
    </div>
  );
}

export default App;



//---------------------------------------------------------------------------------------------------------
// TimerControl + TimerContainer
//---------------------------------------------------------------------------------------------------------
// Используя TimerControl обновите его код, в котором будет использоваться не Timer, а новый контейнерный компонент
//---------------------------------------------------------------------------------------------------------

// const TimerControl = ({ seconds = 1000 }) => { 
//   const [time, setTime] = useState(seconds)
//   const [pause, setPause] = useState(false)
//   const [inputHours, setInputHours] = useState(0)
//   const [inputMinutes, setInputMinutes] = useState(0)
//   const [inputSeconds, setInputSeconds] = useState(0)


//   return (
//     <>
//       <Timer seconds={seconds} />
//       <input type='number' min="0" placeholder='hours' onChange={e => setInputHours(+e.target.value)} />
//       <input type='number' min="0" max="60" placeholder='minutes' onChange={e => setInputMinutes(+e.target.value)} />
//       <input type='number' min="0" max="60" placeholder='seconds' onChange={e => setInputSeconds(+e.target.value)} />
//       <button onClick={() => setTime(inputHours*60*60 + inputMinutes*60 + inputSeconds)}>Start</button>
//       <button disabled={!(seconds)} onClick={() => setPause(pause => !pause)}>Pause</button>
//     </>
//   )
// }


// const Timer = ({ seconds }) => { 
//   const padTime = time => {
//     return String(time).length === 1 ? `0${time}` : `${time}`
//   }
  
//   const format = time => {
//     const hours = Math.floor(time / 60**2)
//     const minutes =  Math.floor(time / 60) % 60
//     const seconds = time % 60

//     return `${hours}:${padTime(minutes)}:${padTime(seconds)}`
//   }

//   return (
//     <>
//       <h1>Timer</h1>
//       <h2>{seconds >= 0 && <p>{format(seconds)}</p>}</h2>
//     </>
//   )
// }

// const TimerContainer = ({ seconds = 1000, refresh = 1000, render: Component }) => {
//   const [time, setTime] = useState(seconds)
  
//   useEffect(() => {
//     let interval = null
//     let t0 = performance.now()
//     if (time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - Math.floor((performance.now() - t0)/1000))
//         // console.log(time)
//       }, refresh)
//     } 
//     return () => {
//       clearInterval(interval)
//     }
//    }, [time])

//   return (
//     <>
//       <Component seconds={time} />
//     </>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <TimerContainer seconds={3605} refresh={2000} render={TimerControl} />
//     </div>
//   )
// }

// export default App;
