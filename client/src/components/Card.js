import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "./Home";

function Card({ pokemon }) {
	const [description, setDescription] = useState('');
	const [speciesUrl, setSpeciesUrl] = useState("");
	const { addPokemonToSquad, removePokemonFromSquad } = useContext(PokemonContext);
    const [detailedPokemon, setDetailedPokemon] = useState(null);

	useEffect(() => {
        if (!pokemon.sprites && pokemon.url) {
            fetch(pokemon)
                .then(response => response.json())
                .then(data => {
                    setDetailedPokemon(data)
                    setSpeciesUrl(data.species.url)
                });
        } else {
            setDetailedPokemon(pokemon);
            if (pokemon.species && pokemon.species.url) {
                setSpeciesUrl(pokemon.species.url);
            }
        }
    }, [pokemon, speciesUrl]);
    

	useEffect(() => {
		if (speciesUrl) {
			fetchDescription(speciesUrl);
		}
	}, [speciesUrl]);

    if (!detailedPokemon) {
        return <div>Loading...</div>;
    }

	function fetchDescription(url) {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setDescription(data);
			});
	}

	return (
		<div className="col">
			<div className="card" style={{ width: 18 + "rem" }}>
				{detailedPokemon && detailedPokemon.sprites ? (
					<img
						src={detailedPokemon.sprites.front_shiny}
						className="card-img-top"
						alt="Loading image..."
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
					<a className="btn btn-success" onClick={() => addPokemonToSquad(detailedPokemon)}>
						Add to Squad
					</a>
					<a className="btn btn-danger" onClick={() => removePokemonFromSquad(detailedPokemon)}>
						Remove from Squad
					</a>
				</div>
			</div>
		</div>
	);
}

export default Card;
