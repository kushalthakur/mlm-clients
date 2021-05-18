import React from 'react';
import { render, screen } from '@testing-library/react';
import AppInitialize from './AppInitialize';
import { history } from './store'

test('renders learn react link', () => {
  render(<AppInitialize history={history} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
