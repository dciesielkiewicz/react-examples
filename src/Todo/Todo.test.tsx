import { render } from '@testing-library/react';
import { Todo } from './Todo';

test('renders Todo header', () => {
  const { getByText } = render(<Todo />);
  const linkElement = getByText('Todo list');
  expect(linkElement).toBeInTheDocument();
});
