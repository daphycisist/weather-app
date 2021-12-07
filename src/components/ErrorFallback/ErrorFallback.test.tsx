import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import ErrorFallback from './ErrorFallback';

test('renders retry button', () => {
  render(
    <Provider store={store}>
      <ErrorFallback
        error="Location not provided"
        resetErrorBoundary={() => {}}
      />
    </Provider>
  );
  const retryButton = screen.getByRole('button', { name: 'Try again' });
  expect(retryButton).toBeInTheDocument();
});
