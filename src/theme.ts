import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  overrides: {
    MuiDialogActions: {
      root: {
        padding: 16,
      }
    }
  }
});
