import { render } from '@testing-library/react';
import { Layout } from './Layout';

const children = 'children';

describe('Layout', () => {
  test('Should render children', () => {
    const { getByText } = render(<Layout>{children}</Layout>);
    expect(getByText(children)).toBeInTheDocument();
  });
});
