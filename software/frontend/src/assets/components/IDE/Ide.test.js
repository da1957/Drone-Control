import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  userEvent.click(getByText('Movement'))
  expect(getByText('forward')).toBeInTheDocument()

  userEvent.click(getByText('Rotation'))
  expect(getByText('turn left')).toBeInTheDocument()

  userEvent.click(getByText('Loops'))
  expect(getByText('for loop')).toBeInTheDocument()
})

//This is also testing reducer, react-testing-library recommends testing the component that implements it
it('allows code block to be added', () => {
  const isTourOpen = false
  const setIsTourOpen = () => {isTourOpen = !isTourOpen}

  const { getByText, getByLabelText } = render(<Ide isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />)

  //Expand movement section
  userEvent.click(getByText('Movement'))

  //Click on forward block to add it
  userEvent.click(getByText('forward'))

  //Check code block exists
  expect(getByLabelText('forward block')).toBeInTheDocument()
})

//React-testing-library is unable to click on the remove button
//I dont know why, but I do know it is more time efficient to manually test
//the remove button rather than implement this unit test
// it('allows code block to be removed', () => {
// })