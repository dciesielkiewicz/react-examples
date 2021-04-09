import { act, fireEvent, getByLabelText, render, waitFor } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { ITodo } from '../types';

const handleDeleteTodoClick = jest.fn();
const handleUpdateTodo = jest.fn();
const loadingDeleteTodoId = null;
const newTitle = 'New todo title';
const resetForm = expect.any(Function);
const setSubmitting = expect.any(Function);
const toggleTodoChecked = jest.fn();
const todo: ITodo = {
  id: 'todoId1',
  title: 'Todo title',
  checked: false,
};
const newTodo: ITodo = {
  ...todo,
  title: newTitle,
};

const props = {
  handleDeleteTodoClick,
  handleUpdateTodo,
  loadingDeleteTodoId,
  toggleTodoChecked,
  todo,
};

describe('TodoItem', () => {
  test('Should properly call toggle checked handler while clicking at checkbox', () => {
    const { container } = render(<TodoItem {...props} />);
    const checkbox = container.querySelector('input[type=checkbox]');
    checkbox && fireEvent.click(checkbox);

    expect(toggleTodoChecked).toBeCalledWith(todo);
  });

  test('Should properly call toggle checked handler while clicking at title', () => {
    const { getByText } = render(<TodoItem {...props} />);
    fireEvent.click(getByText(todo.title));

    expect(toggleTodoChecked).toBeCalledWith(todo);
  });

  test('Should switch form to editable while clicking edit button', () => {
    const { getByLabelText, queryByText, getByPlaceholderText } = render(<TodoItem {...props} />);
    fireEvent.click(getByLabelText('Edit todo'));

    expect(queryByText(todo.title)).toBeNull();
    expect(getByPlaceholderText('Type your todo here')).toBeInTheDocument();
  });

  test('Should properly switch form to editable while clicking edit button and focus input', async () => {
    const { getByLabelText, getByPlaceholderText, queryByText } = render(<TodoItem {...props} />);

    act(() => {
      fireEvent.click(getByLabelText('Edit todo'));
    });

    expect(queryByText(todo.title)).toBeNull();
    const titleInput = getByPlaceholderText('Type your todo here');
    expect(titleInput).toBeInTheDocument();

    await waitFor(() => {
      expect(titleInput).toHaveFocus();
    });
  });

  test('Should display missing title validation', async () => {
    const {
      container,
      getByLabelText,
      getByPlaceholderText,
      getByText,
      queryByText,
    } = render(<TodoItem {...props} />);
    expect(queryByText('Title is required')).toBeNull();

    act(() => {
      fireEvent.click(getByLabelText('Edit todo'));
    });

    const titleInput = getByPlaceholderText('Type your todo here');

    act(() => {
      fireEvent.change(titleInput, { target: { value: '' }});
    });

    act(() => {
      const submitButton = container.querySelector('button[type=submit]');
      submitButton && fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText('Title is required')).toBeInTheDocument();
    });
  });

  test('Should properly submit updated todo', async () => {
    const {
      container,
      getByLabelText,
      getByPlaceholderText,
      queryByText,
    } = render(<TodoItem {...props} />);
    expect(queryByText('Title is required')).toBeNull();

    act(() => {
      fireEvent.click(getByLabelText('Edit todo'));
    });

    const titleInput = getByPlaceholderText('Type your todo here');

    act(() => {
      fireEvent.change(titleInput, { target: { value: newTitle }});
    });

    act(() => {
      const submitButton = container.querySelector('button[type=submit]');
      submitButton && fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(handleUpdateTodo).toBeCalledWith(newTodo, { resetForm, setSubmitting });
    });
  });

  test('Should properly call delete handler', () => {
    const { getByLabelText } = render(<TodoItem {...props} />);
    fireEvent.click(getByLabelText('Delete todo'));

    expect(handleDeleteTodoClick).toBeCalledWith(todo);
  });
});