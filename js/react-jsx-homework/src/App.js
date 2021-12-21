import './App.scss';
import { useState } from 'react';

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
//   const [content, setContent] = useState(open)
//   return (
//     <div onClick={ () => setContent(!content)}>
//       {header}
//       {content && children}
//     </div>
//   )  
// }

// function App() {
//   return (
//     <div className="App">
//       <Spoiler header={<h1>Заголовок</h1>} open>
//         {/* {content} */}
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

const Timer = ({ sec }) => { 
  const [time, setTime] = useState(sec)
  const [pause, setPause] = useState(false)
  
  time > 0 && !pause && setTimeout(() => {
    setTime(time - 1)
  }, 1000);

  return (
    <>
      <h1>Timer</h1>
      {/* {(time > 0 && !pause) ? <p>{time}</p> : <p>Pause</p>} */}
      {time >= 0 && !pause && <p>{time}</p>}
      {time > 0 && pause && <p>Pause</p>}
      <button disabled={!(time)} onClick={() => setPause(!pause)}>Pause</button>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Timer sec={10} />
    </div>
  );
}

export default App;