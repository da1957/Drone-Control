import React from 'react';
import { render } from '@testing-library/react';
import Simulator from './Simulator';

it('renders simulator', () => {
  render(<Simulator />);
});

// TODO: Test it switches to iframe once loaded, I cant figure out how to do this easily 
// without Enzyme which isnt available on react 17
