import { MemoryRouter } from 'react-router-dom'
import { duration } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  test('Should render toggle menu button', () => {
    const { getByLabelText } = render(<Header />);
    expect(getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  test('Should properly open and close navigation', () => {
    const { getByLabelText, getByText, queryByLabelText } = render(<Header />, { wrapper: MemoryRouter });
    expect(queryByLabelText('Navigation menu')).toBeNull();

    fireEvent.click(getByLabelText('Toggle menu'));
    expect(getByLabelText('Navigation menu')).toBeInTheDocument();

    fireEvent.click(getByText('Home'));
    setTimeout(() => {
      expect(queryByLabelText('Navigation menu')).toBeNull();
    }, duration.leavingScreen);
  });
});
