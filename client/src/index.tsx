import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Router } from './router/Router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f2eee4',
      light: '#ffffff',
      dark: '#bfbcb2',
      contrastText: '#000000',
    },
    secondary: {
      main: '#5065a8',
      light: '#8192da',
      dark: '#1b3b79',
      contrastText: '#ffffff',
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
