import moxios from 'moxios';
import { render, waitFor } from '@testing-library/react';
import { Todo } from './Todo';

describe('Todo', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('Should render Todo heading', async () => {
    moxios.stubRequest('/todos', {
      status: 200,
      response: [],
    })

    const { getByText } = render(<Todo />);
    await waitFor(() => {
      expect(getByText('Todo list')).toBeInTheDocument();
    });
  });
});
