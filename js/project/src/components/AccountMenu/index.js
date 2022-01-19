import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../reducers';
import { actionAuthLogout } from '../../actions';

import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import { Logout, AccountCircle } from '@mui/icons-material';
import FeedIcon from '@mui/icons-material/Feed';

let state = store.getState()

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {localStorage.authToken ? <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Настройки аккаунта">
          <IconButton
            onClick={handleClick}
            size="large"
            color="inherit"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
              <AccountCircle sx={{ width: 32, height: 32 }} />
              <Typography>&nbsp;&nbsp;&nbsp;{state.authReducer.payload.sub.login}</Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '30vh',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${state.authReducer.payload.sub.id}`}>
          <MenuItem  sx={{ mb: "0.5rem"}}>
            <Avatar />
            <Typography>Профиль</Typography>
          </MenuItem>
        </Link> 
        <Divider />
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/ads/${state.authReducer.payload.sub.id}`}>
          <MenuItem  sx={{ mb: "0.5rem", mt: "0.5rem", pl: '12px' }}>
            <FeedIcon color='action' sx={{ width: 32, height: 32, mr: '8px' }} />
            <Typography>Мои объявления</Typography>
          </MenuItem>
        </Link> 
        <Divider />
        <MenuItem sx={{ mt: "0.5rem", pt: "0.5rem", pb: "0.5rem"}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography onClick={() => store.dispatch(actionAuthLogout())}>Выйти</Typography>
        </MenuItem>
      </Menu></> : <><Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/login" >
        <Button sx={{ ml: '10px', mr: '5px', color: '#4b0082', bgcolor: '#fff', "&:hover": {bgcolor: '#9c27b0', color: '#fff'} }}  variant='contained'>Войти</Button>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/registration" >
        <Button sx={{ ml: '5px', color: '#4b0082', bgcolor: '#fff', "&:hover": {bgcolor: '#9c27b0', color: '#fff'} }} variant='contained'>Регистрация</Button>
      </Link></>
      }
    </>
  );
}