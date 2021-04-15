import React from 'react';
import { render, screen } from '@testing-library/react';
import { DraggableCodeBlock } from './codeBlocks';

it('renders a draggable code block', () => {
  render(<DraggableCodeBlock name="test" />);
  expect(screen.getByText('test')).toHaveClass('droppable-element code-block test');
});


