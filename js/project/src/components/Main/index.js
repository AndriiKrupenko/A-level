import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CLoginForm from '../LoginForm';
import CRegistrationForm from '../RegistrationForm';
import CAllAds from '../AllAds';
import CAdPage from '../AdPage';
import CMyProfile from '../myProfile'

import { Container, Typography } from '@mui/material';

const PageMain = () => 
  <>
    <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>Объявления</Typography>
    <CAllAds />
  </>

const Page404 = () => 
  <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>404</Typography>

const Main = (token) => 
<Container sx={{ pt: '10vh', pb: '25px', minHeight: '89.4vh' }}>
    <Switch>
        <Route path="/registration" component={CRegistrationForm} />
        <Route path="/login" component={CLoginForm} />
        {!localStorage.authToken && <Redirect from="/" to="/login" />} 
        <Redirect from="/main" to="/" />
        <Route path="/" component={PageMain} exact />
        <Route path="/ad/:_id" component={CAdPage} />
        <Route path="/profile/:_id" component={CMyProfile} />
        <Route path="*" component={Page404} />
    </Switch>
</Container>

const СMain = connect(state => ({token: state.authReducer.token}))(Main)

export default СMain;