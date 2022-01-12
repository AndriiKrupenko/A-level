import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../reducers';
import { actionAuthLogout } from '../../actions';

import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import { Logout, AccountCircle }  from '@mui/icons-material';

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
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
              <AccountCircle sx={{color: "#fff", width: 32, height: 32}} />
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
            mt: 1.5,
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
              right: 14,
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
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/profile/:_id" >
          <MenuItem>
            <Avatar />
            <Typography>Profile</Typography>
          </MenuItem>
        </Link> 
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography onClick={() => store.dispatch(actionAuthLogout())}>Logout</Typography>
        </MenuItem>
      </Menu></> : <><Link to="/login" >
        <Button>Login</Button>
      </Link>
      <Link to="/registration" >
        <Button>Registration</Button>
      </Link></>
      }
    </>
  );
}