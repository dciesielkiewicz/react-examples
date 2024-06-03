import { waitFor } from '@testing-library/react';
import { ITodo, fetchTodos as fetchTodosRequest } from '../api';
import { render } from '../testUtils';
import { Todo } from './Todo';

const fetchTodos = fetchTodosRequest as jest.Mock;

jest.mock('../api/todos/requests', () => ({
  fetchTodos: jest.fn(),
}));

describe('Todo', () => {
  test('Should render Todo heading', async () => {
    fetchTodos.mockImplementation(() => new Promise<ITodo[]>((resolve) => resolve([])));

    const { getByText } = render(<Todo />);
    await waitFor(() => {
      expect(getByText('Todo list')).toBeInTheDocument();
    });
  });
});
