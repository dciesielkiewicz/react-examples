import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import {
  render as testingLibraryRender,
  RenderOptions,
} from '@testing-library/react';
import { theme } from './theme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api';

interface IAllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: IAllTheProvidersProps) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  </MemoryRouter>
);

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => testingLibraryRender(ui, { wrapper: AllTheProviders, ...options });
