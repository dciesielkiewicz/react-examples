import { Box, CircularProgress } from '@material-ui/core';

export const Loader = () => (
  <Box p={4} display="flex" alignItems="center" justifyContent="center">
    <CircularProgress data-testid="loading-icon" />
  </Box>
);
