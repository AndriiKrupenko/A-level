import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountMenu from '../AccountMenu';
import CMySearch from '../Search';
import { Logo } from '../../App';

import { AppBar, Box, Toolbar, IconButton, Badge, Tooltip, Typography } from '@mui/material'

import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import AddIcon from '@mui/icons-material/Add';

const Header = ({ token, favorite }) => 
  <AppBar>
    <Toolbar>
      <Logo /> 
      <CMySearch />
      <Box sx={{ flexGrow: 1 }} />
      {token ? 
        <>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Подать объявление">
              <IconButton size="large" color="inherit">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/newad" >
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <AddIcon sx={{ width: 32, height: 32 }}/>
                    <Typography>&nbsp;&nbsp;&nbsp;Создать объявление</Typography>
                  </Box>
                </Link>
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Сообщения">
              <IconButton size="large" color="inherit">
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon sx={{ width: 32, height: 32 }}/>
                  </Badge>
                  <Typography>&nbsp;&nbsp;&nbsp;Сообщения</Typography>
                </Box>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Избранные объявления">
              <IconButton size="large" color="inherit">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/favorite" >
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Badge badgeContent={Object.keys(favorite).length} color="secondary">
                      <FavoriteIcon sx={{ width: 32, height: 32 }}/>
                    </Badge>
                    <Typography>&nbsp;&nbsp;&nbsp;Избранные</Typography>
                  </Box>
                </Link>
              </IconButton>
            </Tooltip>
          </Box>
          <AccountMenu />
        </>
        : <AccountMenu />}
    </Toolbar>
  </AppBar> 

  
    
const СHeader = connect(state => ({ token: state.authReducer.token, favorite: state.favoriteReducer }))(Header)

export default СHeader;