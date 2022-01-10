import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actionFullRegister } from '../../actions';
import { connect } from 'react-redux';

const RegistrationForm = ({onReg}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='loginRegistrationForm'>
            <h3>Registration form</h3>
            <p><input type="text" placeholder="login" style={{ borderColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/></p>
            <p><input type="text" placeholder="password" style={{ borderColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/></p>
            <p>
              <button disabled={!(login && password)} onClick={() => onReg(login, password)}>Registration</button>&nbsp;
              <Link to="/login" >
                <button>Login &gt;&gt;</button>
              </Link>
            </p>
        </div>
    )
}

const CRegistrationForm = connect(null, { onReg: actionFullRegister })(RegistrationForm)

export default CRegistrationForm;