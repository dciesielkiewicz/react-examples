import { render } from 'testUtils';
import { Loader } from './Loader';

describe('Loader', () => {
  test('Should render loading icon', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loading-icon')).toBeInTheDocument();
  });
});
