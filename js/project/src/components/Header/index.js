import * as React from 'react';
import { Link } from 'react-router-dom';
import { actionAuthLogout } from '../../actions';
import { connect } from 'react-redux';
import store from '../../reducers';
import AccountMenu from '../AccountMenu';

import { AppBar, Box, Toolbar, IconButton, Badge } from '@mui/material'

import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MySearch from '../Search';
import { Logo } from '../../App';

const Header = (token) =>
  <AppBar sx={{ bgcolor: '#4b0082' }}>
    <Toolbar>
      <Logo /> 
      <MySearch />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon sx={{ width: 32, height: 32 }}/>
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <FavoriteIcon sx={{ width: 32, height: 32 }}/>
          </Badge>
        </IconButton>
      </Box>
      <AccountMenu />
    </Toolbar>
  </AppBar>
    
const СHeader = connect(state => ({ token: state.authReducer.token }))(Header)

export default СHeader;