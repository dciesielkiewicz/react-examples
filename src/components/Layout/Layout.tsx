import { ReactNode } from 'react';
import { Box, Container, Grid } from '@mui/material';

import { Background } from '../Background';
import { Header } from '../Header';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => (
  <Background>
    <Header />
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} lg={6}>
          <Box pt={6} pb={4}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Background>
);
