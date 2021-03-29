import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AddTodo } from './AddTodo';

const handleAddTodoSubmit = jest.fn();
const resetForm = expect.any(Function);
const title = 'Todo title';

describe('AddTodo', () => {
  test('Should properly focus on title input', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AddTodo handleAddTodoSubmit={handleAddTodoSubmit} />
    );
    const titleInput = getByPlaceholderText('Type your next todo');
    expect(titleInput).not.toHaveFocus();

    fireEvent.click(getByTestId('focus-input-button'));
    expect(titleInput).toHaveFocus();
  });

  test('Should display missing title validation', async () => {
    const { container, getByText, queryByText } = render(
      <AddTodo handleAddTodoSubmit={handleAddTodoSubmit} />
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
      <AddTodo handleAddTodoSubmit={handleAddTodoSubmit} />
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
      expect(handleAddTodoSubmit).toBeCalledWith({ title }, resetForm);
    });
  });
});
