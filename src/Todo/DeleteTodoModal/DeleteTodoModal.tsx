import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import{ LoadingButton } from '@mui/lab';

import { ITodo } from '../../api';
import { useDeleteTodo } from './useDeleteTodo';

interface IDeleteTodoModalProps {
  closeModal: () => void;
  isOpened: boolean;
  todo: ITodo;
}

export const DeleteTodoModal = ({
  closeModal,
  isOpened,
  todo,
}: IDeleteTodoModalProps) => {
  const { deleteTodo, isLoading } = useDeleteTodo();

  const confirmDeleteTodo = () => {
    deleteTodo({ id: todo.id }, { onSuccess: closeModal });
  };

  return (
    <Dialog open={isOpened} onClose={closeModal} aria-labelledby="delete-todo-title">
      <DialogTitle id="delete-todo-title">
        Delete Todo
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete todo: {todo.title}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={confirmDeleteTodo} variant="contained" color="primary">
          Delete
        </LoadingButton>
        
      </DialogActions>
    </Dialog>
  )
};
