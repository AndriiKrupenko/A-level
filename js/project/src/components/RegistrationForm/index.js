import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFullRegister } from '../../actions';

import { Container, Box, TextField, Typography, Button } from '@mui/material/';

const RegistrationForm = ({onReg}) => { 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

  return (
      <Container sx={{ pt: '15vh', pb: '25px', minHeight: '89.4vh', width: '100%' }}>
        <Box
          sx={{ bgcolor: '#E9DFC4', width: '300px', borderRadius: '10px', mr: 'auto', ml: 'auto', textAlign: 'center', pt: '1rem', pb: '1rem',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
        >
          <Typography variant='h5'>Регистрация</Typography>
          {(login.length >= 4) ? 
            <TextField 
              required
              type="text"
              id="login"
              label="Логин"
              value={login}
              onChange={e => setLogin(e.target.value)} 
            />
            : 
            <TextField 
              error
              type="text"
              id="login"
              label="Логин"
              value={login}
              helperText="Мин. длина 4 символа"
              onChange={e => setLogin(e.target.value)}
            />}
            {(password.length >= 4) ?
            <TextField
              required 
              id="pass"
              type='password'
              label="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
            : 
            <TextField 
              error
              type="password"
              id="pass"
              label="Пароль"
              value={password}
              helperText="Мин. длина 4 символа"
              onChange={e => setPassword(e.target.value)}
            />}
          <Button sx={{ mt: '1rem', mr: '0.5rem', color: '#fff', bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', color: '#fff'} }} variant='contained' disabled={!((login.length >= 4) && (password.length >= 4))} onClick={() => {onReg(login, password)}}>Регистрация</Button>&nbsp;
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login" >
            <Button sx={{ mt: '1rem', color: '#fff', bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', color: '#fff'} }} variant='contained'>Вход &gt;&gt;</Button>
          </Link>
        </Box>
      </Container>
    )
}

const CRegistrationForm = connect(null, { onReg: actionFullRegister })(RegistrationForm)

export default CRegistrationForm;