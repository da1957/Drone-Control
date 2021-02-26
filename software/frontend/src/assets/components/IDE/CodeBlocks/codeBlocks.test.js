import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeBlocks, DraggableCodeBlock } from './codeBlocks';

it('renders a draggable code block', () => {
  render(<DraggableCodeBlock name="test" />);
  expect(screen.getByText('test')).toHaveClass('droppable-element code-block test');
});

it('renders tab pane', () => {
  render(<CodeBlocks items={[{category: "test", array: ["testItem1", "testItem2"]}]} />);
  expect(screen.getByLabelText('test')).toBeDefined();
});

it('renders code blocks', () => {
  render(<CodeBlocks items={[{category: "test", array: ["testItem1", "testItem2"]}]} />);
  expect(screen.getByText('testItem1')).toBeInTheDocument();
  expect(screen.getByText('testItem2')).toBeInTheDocument();
});


