import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountMenu from '../AccountMenu';
import MySearch from '../Search';
import { Logo } from '../../App';

import { AppBar, Box, Toolbar, IconButton, Badge, Tooltip } from '@mui/material'

import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = ({ token, favorite }) =>
  <AppBar sx={{ bgcolor: '#4b0082' }}>
    <Toolbar>
      <Logo /> 
      <MySearch />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Tooltip title="Сообщения">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon sx={{ width: 32, height: 32 }}/>
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Избранные">
          <IconButton size="large" color="inherit">
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/favorite" >
              <Badge badgeContent={Object.keys(favorite).length} color="error">
                  <FavoriteIcon sx={{ width: 32, height: 32 }}/>
                </Badge>
            </Link>
          </IconButton>
        </Tooltip>
      </Box>
      <AccountMenu />
    </Toolbar>
  </AppBar>
    
const СHeader = connect(state => ({ token: state.authReducer.token, favorite: state.favoriteReducer }))(Header)

export default СHeader;