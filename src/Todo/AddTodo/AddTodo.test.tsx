import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from 'testUtils';
import { AddTodo } from './AddTodo';

const addTodo = jest.fn();
const resetForm = expect.any(Function);
const setSubmitting = expect.any(Function);
const checked = false;
const title = 'Todo title';

describe('AddTodo', () => {
  test('Should properly focus on title input', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <AddTodo addTodo={addTodo} />
    );
    const titleInput = getByPlaceholderText('Type your next todo');
    expect(titleInput).not.toHaveFocus();

    fireEvent.click(getByLabelText('Focus add todo input'));
    expect(titleInput).toHaveFocus();
  });

  test('Should display missing title validation', async () => {
    const { container, getByText, queryByText } = render(
      <AddTodo addTodo={addTodo} />
    );
    expect(queryByText('Title is required')).toBeNull();

    act(() => {
      const submitButton = container.querySelector('button[type=submit]');
      submitButton && fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText('Title is required')).toBeInTheDocument();
    });
  });

  test('Should properly submit new todo', async () => {
    const { container, getByPlaceholderText } = render(
      <AddTodo addTodo={addTodo} />
    );
    const titleInput = getByPlaceholderText('Type your next todo');

    act(() => {
      fireEvent.change(titleInput, { target: { value: title }});
    });

    act(() => {
      const submitButton = container.querySelector('button[type=submit]');
      submitButton && fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(addTodo).toBeCalledWith({ title, checked }, { resetForm, setSubmitting });
    });
  });
});
