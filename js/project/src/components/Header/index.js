import { Link } from 'react-router-dom';
import { actionAuthLogout } from '../../actions';
import { connect } from 'react-redux';
import store from '../../reducers';
import { Logo } from '../../App';

const Header = (token) =>
  <header>
    <div>
      <Logo /> 
    </div>
    <div className='logReg'>
      {localStorage.authToken ?
        <Link to="/" >
          <button onClick={() => store.dispatch(actionAuthLogout())}>Logout</button>
        </Link> : 
        <>
          <Link to="/login" >
            <button>Login</button>
          </Link>
          <Link to="/registration" >
            <button>Registration</button>
          </Link>
        </>
      }
    </div>
  </header>
 
const СHeader = connect(state => ({token: state.authReducer.token}))(Header)

export default СHeader;