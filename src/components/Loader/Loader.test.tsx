import { render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  test('Should render loading icon', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loading-icon')).toBeInTheDocument();
  });
});
