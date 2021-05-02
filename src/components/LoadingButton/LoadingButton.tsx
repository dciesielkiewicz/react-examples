import { CircularProgress, IconButton } from '@material-ui/core';

export const LoadingButton = () => (
  <IconButton type="button" disableRipple>
    <CircularProgress size={24} />
  </IconButton>
);
