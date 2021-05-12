import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

it('renders Home', () => {
  render(<Home />)
})

it('renders tourAlert on first load', () => {
  window.localStorage.clear()
  const { getByTestId } = render(<Home />)

  expect(getByTestId('tour')).toBeInTheDocument()
})

it('does not render tourAlert on subsequent loads', () => {
  const {queryByTestId } = render(<Home />)

  expect(queryByTestId('tour')).toBeNull()
})
