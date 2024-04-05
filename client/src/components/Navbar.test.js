import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import Navbar from "./Navbar.js";

let container = null;

// Sets up a clean environment before testing
beforeEach(() => {
    // Container is a DOM element that is a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
// Tears down environment after testing
afterEach(() => {
// Unmount and "clean up" once test completes, in order to isolate the effects of a test to itself
unmountComponentAtNode(container);
container.remove();
container = null;
});

// Snapshot
test('the component renders correctly', ()=> {
    const component = renderer.create(<Navbar />) // Creating an instance of the component
    const tree = component.toJSON(); // Convert to JSON
    expect(tree).toMatchSnapshot(); // Jest will create or update snapshot file
})