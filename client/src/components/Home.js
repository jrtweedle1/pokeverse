import { useState, useEffect } from "react";
import Card from "./Card";

function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
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
      <h1>Home</h1>
      <h2>My Squad</h2>
      <h2>Available Pokemon</h2>
      <div>
        {allPokemon.map(singlePokemon => {
            return <Card key={singlePokemon.name} pokemon={singlePokemon}></Card>
        })}
      </div>
    </div>
  );
}

export default Home;
