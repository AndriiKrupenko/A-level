import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CLoginForm from '../LoginForm';
import CRegistrationForm from '../RegistrationForm';
import CAllAds from '../AllAds';
import CAdPage from '../AdPage';

const PageMain = () => 
    <>
      <h1>Объявления</h1>
      <CAllAds />
    </>

const Page404 = () => 
  <h1>404</h1>

const Main = (token) => 
<main>
    <Switch>
        <Route path="/registration" component={CRegistrationForm} />
        <Route path="/login" component={CLoginForm} />
        {!localStorage.authToken && <Redirect from="/" to="/login" />} 
        <Redirect from="/main" to="/" />
        <Route path="/" component={PageMain} exact />
        <Route path="/ad/:_id" component={CAdPage} />
        <Route path="*" component={Page404} />
    </Switch>
</main>

const СMain = connect(state => ({token: state.authReducer.token}))(Main)

export default СMain;