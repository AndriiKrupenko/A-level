import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#290302'
    },
    secondary: {
      main: '#D4C199'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#E9DFC4'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Roboto Slab'
  },
});

ReactDOM.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  // </React.StrictMode >
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
