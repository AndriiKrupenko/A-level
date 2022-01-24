import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CLoginForm from '../LoginForm';
import CRegistrationForm from '../RegistrationForm';
import CAllAdsPage from '../AllAdsPage';
import CAdPage from '../AdPage';
import CMyProfilePage from '../myProfile';
import CFavorite from '../Favorite';
import CAdEditor from '../AdEditor';

import CSearchPage from '../SearchPage';
import CNewAd from '../NewAd'
import CMyAdsPage from '../MyAdsPage'
import CProfileEditor from '../ProfileEditor'

import { Container, Typography } from '@mui/material';


const PageMain = () => 
  <>
    <Typography sx={{ textAlign: "center", pt: "1rem", pb: "1rem" }} variant='h4'>Все объявления</Typography>
    <CAllAdsPage />
  </>

const Page404 = () => 
  <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>404</Typography>

const Main = (token) => 
<Container sx={{ pt: '10vh', pb: '25px', minHeight: '89.4vh' }}>
    <Switch>
        <Route path="/registration" component={CRegistrationForm} />
        <Route path="/login" component={CLoginForm} />
        {!localStorage.authToken && <Redirect to="/login" />} 
        <Redirect from="/main" to="/" />
        <Route path="/" component={PageMain} exact />
        <Route path="/ad/:_id" component={CAdPage} />
        <Route path="/edit/:_id" component={CAdEditor} />
        <Route path="/newad" component={CNewAd} />
        <Route path="/favorite" component={CFavorite} />
        <Route path="/ads/:_id" component={CMyAdsPage} />
        <Route path="/profile/:_id" component={CMyProfilePage} />
        <Route path="/editprofile/:_id" component={CProfileEditor} />
        <Route path="/search/:searchText" component={CSearchPage} />
        <Route path="*" component={Page404} />
    </Switch>
</Container>

const СMain = connect(state => ({token: state.authReducer.token}))(Main)

export default СMain;