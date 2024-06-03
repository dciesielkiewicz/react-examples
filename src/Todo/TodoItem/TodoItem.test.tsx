import { fireEvent, waitFor } from '@testing-library/react';
import { ITodo, updateTodo as updateTodoRequest } from '../../api';
import { render } from '../../testUtils';
import { TodoItem } from './TodoItem';

const updateTodo = updateTodoRequest as jest.Mock;

jest.mock('../../api/todos/requests', () => ({
  updateTodo: jest.fn(),
}));

const handleDeleteTodoClick = jest.fn();
const newTitle = 'New todo title';
const todo: ITodo = {
  id: 'todoId1',
  title: 'Todo title',
  checked: false,
};
const newTodo: ITodo = {
  ...todo,
  title: newTitle,
};
const toggledTodo: ITodo = {
  ...todo,
  checked: !todo.checked,
}

const props = {
  handleDeleteTodoClick,
  todo,
};

describe('TodoItem', () => {
  beforeEach(() => {
    updateTodo.mockClear();
  });

  test('Should properly call toggle checked handler while clicking at checkbox', async () => {
    const { getByLabelText } = render(<TodoItem {...props} />);
    fireEvent.click(getByLabelText('Toggle todo'));

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith(toggledTodo);
    })
  });

  test('Should properly call toggle checked handler while clicking at title', async () => {
    const { getByText } = render(<TodoItem {...props} />);
    fireEvent.click(getByText(todo.title));

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith(toggledTodo);
    });
  });

  test('Should switch form to editable while clicking edit button', () => {
    const { getByLabelText, queryByText, getByPlaceholderText } = render(<TodoItem {...props} />);
    fireEvent.click(getByLabelText('Edit todo'));

    expect(queryByText(todo.title)).toBeNull();
    expect(getByPlaceholderText('Type your todo here')).toBeInTheDocument();
  });

  test('Should properly switch form to editable while clicking edit button and focus input', async () => {
    const { getByLabelText, getByPlaceholderText, queryByText } = render(<TodoItem {...props} />);

    fireEvent.click(getByLabelText('Edit todo'));

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

    fireEvent.click(getByLabelText('Edit todo'));

    const titleInput = getByPlaceholderText('Type your todo here');

    fireEvent.change(titleInput, { target: { value: '' }});

    const submitButton = container.querySelector('button[type=submit]');
    submitButton && fireEvent.click(submitButton);

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

    fireEvent.click(getByLabelText('Edit todo'));

    const titleInput = getByPlaceholderText('Type your todo here');

    fireEvent.change(titleInput, { target: { value: newTitle }});

    const submitButton = container.querySelector('button[type=submit]');
    submitButton && fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith(newTodo);
    });
  });

  test('Should properly call delete handler', () => {
    const { getByLabelText } = render(<TodoItem {...props} />);
    fireEvent.click(getByLabelText('Delete todo'));

    expect(handleDeleteTodoClick).toHaveBeenCalledWith(todo);
  });
});
