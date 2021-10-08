import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import {
  render as testingLibraryRender,
  RenderOptions,
} from '@testing-library/react';
import { theme } from './theme';

interface IAllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: IAllTheProvidersProps) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => testingLibraryRender(ui, { wrapper: AllTheProviders, ...options });
