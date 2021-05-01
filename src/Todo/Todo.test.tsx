import { render } from '@testing-library/react';
import { Todo } from './Todo';

test('Should render Todo heading', () => {
  const { getByText } = render(<Todo />);
  expect(getByText('Todo list')).toBeInTheDocument();
});
