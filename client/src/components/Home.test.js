import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { TextEncoder, TextDecoder } from "util";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home.js";

// Declare container to which things will be rendered/mounted
let container = null;

// Declare encoders due to node version; necessary for tests to pass
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup server with MSW to mock API calls; these are called "handlers"
const server = setupServer(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
        const limit = req.url.searchParams.get("limit");
        if (limit == "151") {
            return res(
                ctx.status(200),
                ctx.json({
                    results: [
                        {
                            name: "bulbasaur",
                            url: "https://pokeapi.co/api/v2/pokemon/1/",
                        },
                        {
                            name: "pikachu",
                            url: "https://pokeapi.co/api/v2/pokemon/25",
                        },
                    ],
                })
            );
        }
    }),
    rest.get("https://pokeapi.co/api/v2/pokemon/:pokemonId", (req, res, ctx) => {
        const { pokemonId } = req.params;
        if (pokemonId === "1") {
            return res(
                ctx.json({
                    id: 1,
                    name: "bulbasaur",
                    // Include more details here if I need for testing
                })
            );
        }
        if (pokemonId === "25") {
            return res(
                ctx.json({
                    id: 25,
                    name: "pikachu",
                    // Include more details here if I need for testing
                })
            );
        }
    })
);

// Establish API mocking before every test
beforeAll(() => server.listen());

// Sets up a clean environment before testing
beforeEach(() => {
	// Container is a DOM element that is a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

// Close the server and clean up after all tests
afterAll(() => server.close());

// Tears down environment after testing
afterEach(() => {
	// Unmount and "clean up" once test completes, in order to isolate the effects of a test to itself
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	server.resetHandlers(); // Reset request handlers to prevent affecting other tests
});

// Snapshot - compares current version to previous snapshot
test("the component renders correctly", () => {
	const component = renderer.create(<Home />); // Creating an instance of the component
	const tree = component.toJSON(); // Convert to JSON
	expect(tree).toMatchSnapshot(); // Jest will create or update snapshot file
});

// Test API Call
test("displays fetched Pokemon on the homepage", async () => {
	render(<Home />);
	await waitFor(() => {
		expect(screen.getByText("bulbasaur")).toBeInTheDocument();
		expect(screen.getByText("pikachu")).toBeInTheDocument();
	});
});

// TODO: Test Component Rendering

// TODO: Test State Management
