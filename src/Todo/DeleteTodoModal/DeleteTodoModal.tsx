import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ITodo } from '../types';

interface IDeleteTodoModalProps {
  closeModal: () => void;
  deleteTodo: (todoId: ITodo['id']) => void;
  isOpened: boolean;
  todo: ITodo;
}

export const DeleteTodoModal = ({
  closeModal,
  deleteTodo,
  isOpened,
  todo,
}: IDeleteTodoModalProps) => {

  const confirmDeleteTodo = () => {
    deleteTodo(todo.id);
    closeModal();
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
        <Button onClick={confirmDeleteTodo} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
};
