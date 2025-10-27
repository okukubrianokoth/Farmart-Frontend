jest.mock('axios', () => {
  const mockAxios = {
    get: jest.fn(),
    post: jest.fn(),
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };
  return mockAxios;
});

// Silence console.log for cleaner test output
jest.spyOn(console, 'log').mockImplementation(() => {});

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

test('renders App component without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
