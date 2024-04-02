import { useState, useEffect } from "react";

function Card({ pokemon }) {
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [description, setDescription] = useState(null);
  const [speciesUrl, setSpeciesUrl] = useState("");

  useEffect(() => {
    if (pokemon.name !== null) {
      fetchSinglePokemon();
      console.log("singlePokemon", singlePokemon)
    }
  }, [pokemon.url]);

  useEffect(() => {
    if (speciesUrl) {
      fetchDescription();
    }
  }, [speciesUrl]);

  function fetchSinglePokemon() {
    fetch(pokemon.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSinglePokemon(data);
        setSpeciesUrl(data.species.url);
      });
  }

  function fetchDescription() {
    fetch(speciesUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDescription(data);
      });
  }

  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      {singlePokemon && singlePokemon.sprites ? (
        <img
          src={singlePokemon.sprites.front_shiny}
          className="card-img-top"
          alt="Loading..."
        ></img>
      ) : (
        <p>Loading...</p>
      )}
      <div className="card-body">
        <h5 className="card-title">{singlePokemon ? singlePokemon.name : "Loading..." }</h5>
        <p className="card-text">
          {description ? description.flavor_text_entries[0].flavor_text : "Loading description..."}
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default Card;
