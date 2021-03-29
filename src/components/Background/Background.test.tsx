import { render } from '@testing-library/react';
import { Background } from './Background';
const children = 'children';

describe('Background', () => {
  test('Should render loading icon', () => {
    const { getByText, getByTestId } = render(<Background>{children}</Background>);
    expect(getByTestId('background')).toHaveStyle({ backgroundColor: '#f5f5f5', minHeight: '100vh' });
    expect(getByText('children')).toBeDefined();
  });
});
