import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './navbar';

it('renders navbar', () => {
  render(
    <BrowserRouter>
      <Navbar />)
    </BrowserRouter>
  );
  expect(screen.getByText('dronecontrol')).toBeInTheDocument();
});