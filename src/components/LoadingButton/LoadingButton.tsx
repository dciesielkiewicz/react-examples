import { CircularProgress, IconButton } from '@mui/material';

export const LoadingButton = () => (
  <IconButton type="button" disableRipple>
    <CircularProgress size={24} />
  </IconButton>
);
