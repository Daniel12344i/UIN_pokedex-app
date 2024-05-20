import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function Type() {
  const { type } = useParams();
  const [pokemons, setPokemons] = useState([]);
  const [typeDetails, setTypeDetails] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.pokemon.map(p => p.pokemon));
        setTypeDetails(data);
      });
  }, [type]);

  const getTypeColorClass = (pokemonType) => {
    return pokemonType ? `type-badge ${pokemonType}` : '';
  };

  return (
    <div className="type-page">
      {typeDetails && (
        <>
          <div className="type-header">
            <img src={`/assets/${type}.png`} alt={type} className="type-icon" />
            <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
          </div>
          <div className="type-pokemon-grid">
            {pokemons.map((pokemon, index) => (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                className={`type-pokemon-card ${getTypeColorClass(type)}`}
              >
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
                <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                <p>#{String(pokemon.url.split('/')[6]).padStart(3, '0')}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Type;
