import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { TODO_ROUTE } from 'routes';

export const Home = () => (
  <>
    <Box mb={2}>
      <Typography variant='h4'>
        Welcome to My React Examples.
      </Typography>
    </Box>
    <Box mb={8}>
      <Typography variant='body1'>
        Pick a project you want to discover.
      </Typography>
    </Box>
    <Button component={Link} to={TODO_ROUTE} variant="contained" color="primary">
      Go to TODO App
    </Button>
  </>
);
