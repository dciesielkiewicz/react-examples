import { createTheme, Theme } from '@mui/material';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});
