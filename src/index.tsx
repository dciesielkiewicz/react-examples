import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { App } from './App';
import { ConfigureAxios } from './ConfigureAxios';
import { theme } from './theme';
import { reportWebVitals } from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfigureAxios>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ConfigureAxios>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
