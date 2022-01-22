import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actionFullLogin } from '../../actions';
import { connect } from 'react-redux';

import { Container, Box, TextField, Typography, Button } from '@mui/material/';

const LoginForm = ({ onLogin }) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

  return (
      <Container sx={{ pt: '15vh', pb: '25px', minHeight: '89.4vh', width: '100%' }}>
        <Box
          component="form"
          sx={{ bgcolor: '#E9DFC4', width: '300px', borderRadius: '10px', mr: 'auto', ml: 'auto', textAlign: 'center', pt: '1rem', pb: '1rem',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <Typography variant='h5'>Войдите в аккаунт</Typography>
            <TextField 
              required
              type="text"
              id="login"
              label="Логин"
              value={login}
              onChange={e => setLogin(e.target.value)} 
            />
            <TextField
              required 
              id="pass"
              type='password'
              label="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
              <Button sx={{ mt: '1rem', mr: '0.5rem', color: '#fff', bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', color: '#fff'} }} variant='contained' disabled={!(login && password)} onClick={() => {onLogin(login, password)}}>Войти</Button>&nbsp;
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/registration" >
                <Button sx={{ mt: '1rem', color: '#fff', bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', color: '#fff'} }} variant='contained'>Регистрация &gt;&gt;</Button>
              </Link>
            
        </Box>
      </Container>
    )
}

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm)

export default CLoginForm;