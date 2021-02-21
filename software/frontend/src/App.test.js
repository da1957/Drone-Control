import React from "react";
import { render, unmountComponentAtNode} from "react-dom";
import Navbar from './assets/components/navbar'
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as render target
  container = document.createElement("div");
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

test('Renders navbar', () => {
  render(<Navbar />, container);
  expect(container.textContent).toBe("dronecontrol");
})
