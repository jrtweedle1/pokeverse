import { useState, useEffect, createContext } from "react";
import Card from "./Card";

function Home() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [squad, setSquad] = useState([]);

	useEffect(() => {
		fetchAllPokemon();
	}, []);

	function fetchAllPokemon() {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
			.then((response) => {
				return response.json();
			})
			.then((allPokemon) => {
				setAllPokemon(allPokemon.results);
			});
	}

	return (
		<div>
			<h1 className="text-center">Home</h1>
			<h2 className="text-center">My Squad</h2>
			<h2 className="text-center">Available Pokemon</h2>
			<div class="container text-center">
				<div class="row">
					{allPokemon.map((singlePokemon) => {
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
	);
}

export default Home;
export const PokemonContext = createContext([]);
