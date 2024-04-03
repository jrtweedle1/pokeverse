import { useState, useEffect, createContext } from "react";
import Card from "./Card";

function Home() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [squad, setSquad] = useState([]);

	useEffect(() => {
		fetchAllPokemon();
	});

    useEffect(() => {
        console.log(squad); // This will log the updated state after changes.
    }, [squad]);

	function fetchAllPokemon() {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setAllPokemon(data.results);
			});
	}

	function addPokemonToSquad(singlePokemon, description) {
		console.log("addPokemon", singlePokemon);
		// TODO: Add logic to prevent duplicates
		setSquad(prevSquad => {
            console.log(prevSquad)
            return [...prevSquad, singlePokemon];
        })
	}

	function removePokemonFromSquad(singlePokemon) {
		console.log("removePokemon", singlePokemon);
		setSquad(
			squad.filter((squadPokemon) => squadPokemon.name !== singlePokemon)
		);
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
		</PokemonContext.Provider>
	);
}

export default Home;
export const PokemonContext = createContext([]);
