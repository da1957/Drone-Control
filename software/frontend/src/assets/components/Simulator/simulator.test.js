import React from 'react';
import { render } from '@testing-library/react';
import Simulator from './simulator';

it('renders simulator', () => {
  render(<Simulator />);
});

it('initially displays loading spinner', () => {
  const { container } = render(<Simulator />);
  
  expect(container.textContent).toContain("Loading...")
});

// TODO: Test it switches to iframe once loaded, I cant figure out how to do this easily 
// without Enzyme which isnt available on react 17
