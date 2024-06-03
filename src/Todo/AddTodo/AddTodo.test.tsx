import { fireEvent, waitFor } from '@testing-library/react';
import { addTodo as addTodoRequest } from '../../api';
import { render } from '../../testUtils';
import { AddTodo } from './AddTodo';

const addTodo = addTodoRequest as jest.Mock;

jest.mock('../../api/todos/requests', () => ({
  addTodo: jest.fn(),
}));

const checked = false;
const title = 'Todo title';

describe('AddTodo', () => {
  test('Should properly focus on title input', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <AddTodo />
    );
    const titleInput = getByPlaceholderText('Type your next todo');
    expect(titleInput).not.toHaveFocus();

    fireEvent.click(getByLabelText('Focus add todo input'));
    expect(titleInput).toHaveFocus();
  });

  test('Should display missing title validation', async () => {
    const { container, getByText, queryByText } = render(
      <AddTodo />
    );
    expect(queryByText('Title is required')).toBeNull();

    const submitButton = container.querySelector('button[type=submit]');
    submitButton && fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Title is required')).toBeInTheDocument();
    });
  });

  test('Should properly submit new todo', async () => {
    const { container, getByPlaceholderText } = render(
      <AddTodo />
    );
    const titleInput = getByPlaceholderText('Type your next todo');

    fireEvent.change(titleInput, { target: { value: title }});

    const submitButton = container.querySelector('button[type=submit]');
    submitButton && fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith({ title, checked });
    });
  });
});
