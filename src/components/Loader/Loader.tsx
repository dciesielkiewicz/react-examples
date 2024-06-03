import { Box, CircularProgress } from '@mui/material';

export const Loader = () => (
  <Box p={4} display="flex" alignItems="center" justifyContent="center">
    <CircularProgress data-testid="loading-icon" />
  </Box>
);
