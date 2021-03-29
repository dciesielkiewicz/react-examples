import { Box, Paper, Typography } from '@material-ui/core';
import { TodoList } from './TodoList';

export const Todo = () => (
  <>
    <Box mb={5}>
      <Typography variant='h2'>Todo list</Typography>
    </Box>
    <Paper>
      <Box p={4}>
        <TodoList />
      </Box>
    </Paper>
  </>
);
