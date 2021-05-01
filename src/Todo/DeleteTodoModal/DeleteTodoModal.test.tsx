import { duration } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';
import { ITodo } from '../types';
import { DeleteTodoModal } from './DeleteTodoModal';

const todo: ITodo = {
  id: 'todoId1',
  title: 'Todo 1',
  checked: false,
}

const closeModal = jest.fn();
const handleDeleteTodo = jest.fn();

const props = {
  closeModal,
  handleDeleteTodo,
  isOpened: true,
  todo,
}

describe('DeleteTodoModal', () => {
  test('Should not render closed modal', () => {
    const closedProps = {
      ...props,
      isOpened: false,
    };
    const { queryByText } = render(<DeleteTodoModal {...closedProps} />);
    expect(queryByText('Delete Todo')).toBeNull();
  });

  test('Should render modal and todo', () => {
    const { getByText } = render(<DeleteTodoModal {...props} />);
    expect(getByText('Delete Todo')).toBeInTheDocument();
    expect(getByText(
      `Are you sure you want to delete todo: ${todo.title}?`
    )).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });

  test('Should properly close modal', () => {
    const { getByText, queryByText } = render(<DeleteTodoModal {...props} />);
    fireEvent.click(getByText('Cancel'));
    setTimeout(() => {
      expect(queryByText('Delete Todo')).toBeNull();
    }, duration.leavingScreen);
  });

  test('Should properly trigger delete action', () => {;
    const { getByText } = render(<DeleteTodoModal {...props} />);
    fireEvent.click(getByText('Delete'));
    expect(handleDeleteTodo).toBeCalledWith(todo.id);
  });
});
