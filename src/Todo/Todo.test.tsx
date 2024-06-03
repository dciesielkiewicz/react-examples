import moxios from 'moxios';
import { waitFor } from '@testing-library/react';
import { render } from '../testUtils';
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
