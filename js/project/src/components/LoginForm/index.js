import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actionFullLogin } from '../../actions';
import { connect } from 'react-redux';

const LoginForm = ({ onLogin }) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='loginRegistrationForm'>
            <h3>Login form</h3>
            <p><input type="text" placeholder="login" style={{ borderColor: login ? '' : 'red' }} value={login} onChange={e => setLogin(e.target.value)}/></p>
            <p><input type="text" placeholder="password" style={{ borderColor: password ? '' : 'red' }} value={password} onChange={e => setPassword(e.target.value)}/></p>
            <p>
              <button disabled={!(login && password)} onClick={() => {onLogin(login, password)}}>Login</button>&nbsp;
              <Link to="/registration" >
                <button>Registration &gt;&gt;</button>
              </Link>
            </p>
        </div>
    )
}

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm)

export default CLoginForm;