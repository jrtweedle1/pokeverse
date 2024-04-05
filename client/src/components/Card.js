import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "./Home";

function Card({ pokemon }) {
	const { squad, addPokemonToSquad, removePokemonFromSquad } =
		useContext(PokemonContext); // Functions to add/remove Pokemon from "squad"
	const [description, setDescription] = useState(""); // Setting state for description renders, which required another API call
	const [detailedPokemon, setDetailedPokemon] = useState(null); // Setting state for detailed Pokemon info
	const [speciesUrl, setSpeciesUrl] = useState(""); // Setting state for "species URL" which provides description info

    // If info for a single Pokemon or the species URL changes, update the DOM to reflect that
	useEffect(() => {
		if (!pokemon.sprites && pokemon.url) {
			fetch(pokemon)
				.then((response) => response.json())
				.then((data) => {
					setDetailedPokemon(data);
					setSpeciesUrl(data.species.url);
				});
		} else {
			setDetailedPokemon(pokemon);
			if (pokemon.species && pokemon.species.url) {
				setSpeciesUrl(pokemon.species.url);
			}
		}
	}, [pokemon, speciesUrl]);

    // When species URL changes (based on the way the API is called), fetch the description
	useEffect(() => {
		if (speciesUrl) {
			fetchDescription(speciesUrl);
		}
	}, [speciesUrl]);

    // If we don't have detailed Pokemon info, just show the user loading info
	if (!detailedPokemon) {
		return <div>Loading...</div>;
	}

    // API call to return the description, since the description is not present in the detailedPokemon object
	function fetchDescription(url) {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setDescription(data);
			});
	}

    // Renders Card(s) in the DOM
	return (
		<div className="col">
			<div className="card" style={{ width: 18 + "rem" }}>
				{detailedPokemon && detailedPokemon.sprites ? (
					<img
						src={detailedPokemon.sprites.front_shiny}
						className="card-img-top"
						alt="Loading sprite..."
					></img>
				) : (
					<p>Loading...</p>
				)}
				<div className="card-body">
					<h5
						className="card-title"
						style={{ textTransform: "uppercase" }}
					>
						{detailedPokemon ? detailedPokemon.name : "Loading..."}
					</h5>
					<p className="card-text">
						{description
							? description.flavor_text_entries[0].flavor_text
							: "Loading description..."}
					</p>
					{squad.some(pkmn => pkmn.name === detailedPokemon.name) ? (
						<button
							className="btn btn-danger"
							onClick={() =>
								removePokemonFromSquad(detailedPokemon)
							}
						>
							Remove from Squad
						</button>
					) : (
						<button
							className="btn btn-success"
							onClick={() => addPokemonToSquad(detailedPokemon)}
						>
							Add to Squad
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
