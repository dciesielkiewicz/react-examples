import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { App } from './App';
import { ConfigureAxios } from './ConfigureAxios';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <ConfigureAxios>
          <App />
        </ConfigureAxios>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
)
