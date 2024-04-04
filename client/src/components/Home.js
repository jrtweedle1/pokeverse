import { useState, useEffect, createContext } from "react";
import Card from "./Card";

function Home() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [squad, setSquad] = useState([]);

	useEffect(() => {
		fetchAllPokemon();
	}, []);

	useEffect(() => {}, [allPokemon]);

	useEffect(() => {}, [squad]);

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

	// function fetchAllPokemon() {
	// 	fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setAllPokemon(data.results);
	// 		});
	// }

	function addPokemonToSquad(singlePokemon) {
		const newAllPokemon = allPokemon.filter(function (pkmn) {
			return pkmn.name != singlePokemon.name;
		});
		setAllPokemon(newAllPokemon);
		setSquad((prevSquad) => {
			return [...prevSquad, singlePokemon];
		});
	}

	function removePokemonFromSquad(singlePokemon) {
		setSquad((squad) =>
			squad.filter(
				(squadPokemon) => squadPokemon.name !== singlePokemon.name
			)
		);
		console.log("singlePokemon", singlePokemon);
		console.log("allPokemon", allPokemon);
		setAllPokemon((currentAllPokemon) => [...allPokemon, singlePokemon]);
	}

	return (
		<PokemonContext.Provider
			value={{ squad, addPokemonToSquad, removePokemonFromSquad }}
		>
			<div>
				<h1 className="text-center">Home</h1>
				<h2 className="text-center">My Squad</h2>
				<div className="container text-center">
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
				<h2 className="text-center">Available Pokemon</h2>
				<div className="container text-center">
					<div class="row">
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
		</PokemonContext.Provider>
	);
}

export default Home;
export const PokemonContext = createContext([]);
