import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/app.scss';

function MainPokemons() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  return (
    <div className="main-pokemons-grid">
      {pokemons.map((pokemon, index) => (
        <Link key={pokemon.name} to={`/pokemon/${pokemon.name.toLowerCase()}`} className="pokemon-card">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
          <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          <p>#{String(index + 1).padStart(3, '0')}</p>
        </Link>
      ))}
    </div>
  );
}

export default MainPokemons;
