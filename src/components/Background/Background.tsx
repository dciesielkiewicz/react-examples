import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface IBackgroundProps {
  children: ReactNode;
}

export const Background = ({ children }: IBackgroundProps) => (
  <Box
    data-testid="background"
    sx={{
      backgroundColor: 'grey.100',
      minHeight: '100vh'
    }}
  >
    {children}
  </Box>
);
