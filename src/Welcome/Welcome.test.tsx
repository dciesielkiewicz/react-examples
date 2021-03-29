import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Welcome } from './Welcome';

describe('Welcome', () => {
  test('Should render welcome heading, subheading and navigation buttons', () => {
    const { getByText } = render(<Welcome />, { wrapper: MemoryRouter})
    expect(getByText('Welcome to My React Examples.')).toBeInTheDocument();
    expect(getByText('Pick a project you want to discover.')).toBeInTheDocument();
    expect(getByText('Go to TODO App')).toBeInTheDocument();
  });
});
