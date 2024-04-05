import { useState, useEffect, createContext } from "react";
import Card from "./Card.js";

function Home() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [squad, setSquad] = useState([]);

	// On page load, no more and no less, fetch all 151 original Pokemon
	useEffect(() => {
		fetchAllPokemon();
	}, []);

	// Initial function to populate all 151 original Pokemon
	async function fetchAllPokemon() {
		const initialPokemonJson = await fetch(
			"https://pokeapi.co/api/v2/pokemon?limit=151"
		);
		const initialPokemonNoResults = await initialPokemonJson.json();
		const initialPokemonResults = initialPokemonNoResults.results;
		const pokemonUrls = initialPokemonResults.map((pkmn) => pkmn.url);
		const pokemonDetails = await Promise.all(
			pokemonUrls.map(async (url) => {
				const response = await fetch(url);
				return await response.json();
			})
		);
		setAllPokemon(pokemonDetails);
	}

	// Adds Pokemon to squad, removes them from list of all Pokemon
	function addPokemonToSquad(singlePokemon) {
		const newAllPokemon = allPokemon.filter(function (pkmn) {
			return pkmn.name !== singlePokemon.name;
		});
		setAllPokemon(newAllPokemon);
		setSquad((prevSquad) => {
			return [...prevSquad, singlePokemon];
		});
	}

	// Removes Pokemon from squad, adds them to list of all Pokemon
	function removePokemonFromSquad(singlePokemon) {
		setSquad((squad) =>
			squad.filter(
				(squadPokemon) => squadPokemon.name !== singlePokemon.name
			)
		);
		setAllPokemon((currentAllPokemon) => [...allPokemon, singlePokemon]);
	}

	// Renders "homepage" in the DOM
	return (
		// Enables us to pass down squad info/functions to lower-level components
		<PokemonContext.Provider
			value={{ squad, addPokemonToSquad, removePokemonFromSquad }}
		>
			<div>
				<div id="squad-div">
					<h1 className="text-center">CURRENT SQUAD</h1>
					<div className="container text-center d-flex justify-content-center">
						<div className="row">
							{squad.map((singlePokemon) => {
								return (
									<Card
										key={singlePokemon.name}
										pokemon={singlePokemon}
									></Card>
								);
							})}
						</div>
					</div>
				</div>
				<div id="all-pokemon-div">
					<h1 className="text-center">AVAILABLE POKEMON</h1>
					<div className="container text-center">
						<div
							className="row d-flex justify-content-center"
						>
							{allPokemon
								? allPokemon.map((singlePokemon) => {
										return (
											<Card
												key={singlePokemon.name}
												pokemon={singlePokemon}
											></Card>
										);
								  })
								: "Loading..."}
						</div>
					</div>
				</div>
			</div>
		</PokemonContext.Provider>
	);
}

export default Home;
export const PokemonContext = createContext([]);
