import { StrictMode } from 'react';
import { QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { queryClient } from './api';
import { App } from './App';
import { ConfigureAxios } from './ConfigureAxios';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <ConfigureAxios>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ConfigureAxios>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
)
