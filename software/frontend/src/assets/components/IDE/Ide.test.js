import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Ide from './Ide';

it('renders Ide', () => {
  const isTourOpen = false
  const setIsTourOpen = () => {isTourOpen = !isTourOpen}
  
  render(<Ide isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />)
})

it('allows sidebar sections to be expanded', () => {
  const isTourOpen = false
  const setIsTourOpen = () => {isTourOpen = !isTourOpen}

  const { getByText } = render(<Ide isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />)

  fireEvent.click(getByText('Movement'))
  expect(getByText('forward')).toBeInTheDocument()

  fireEvent.click(getByText('Rotation'))
  expect(getByText('turn left')).toBeInTheDocument()

  fireEvent.click(getByText('Loops'))
  expect(getByText('for loop')).toBeInTheDocument()
})

it('allows code block to be added', () => {
  const isTourOpen = false
  const setIsTourOpen = () => {isTourOpen = !isTourOpen}

  const { getByText, getByLabelText } = render(<Ide isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />)

  //Expand movement section
  fireEvent.click(getByText('Movement'))

  //Click on forward block to add it
  fireEvent.click(getByText('forward'))

  //Check code block exists
  expect(getByLabelText('forward block')).toBeInTheDocument()
})