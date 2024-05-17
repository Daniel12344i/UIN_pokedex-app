import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Pokemon() {
  const { pokemon } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No Pokémon found');
        }
        return response.json();
      })
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [pokemon]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!details) return <p>No Pokémon found</p>;

  return (
    <section class="pokemon-detail">
        <section className='pokeman-display'>
  <section class="pokemon-header">
    <h2>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
    <img src={details.sprites.other['official-artwork'].front_default} alt={details.name} />
  </section>
  
  <section class="pokemon-info">
    <section class="pokemon-types">
      <h3>Type(s)</h3>
      <div class="types-container">
        {details.types.map(type => (
          <span key={type.type.name} className={`type-badge ${type.type.name}`}>
            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
          </span>
        ))}
      </div>
    </section>
        
    <section class="pokemon-stats">
      <h3>Stats</h3>
      <ul>
        {details.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </section>
  </section>
  </section>
  
  <section class="pokemon-abilities">
    <h3>Abilities</h3>
    {details.abilities.map(ability => (
      <article key={ability.ability.name} className="ability">
        <strong>{ability.ability.name.replace('-', ' ')}</strong>
        <p>Loading...</p>
      </article>
    ))}
  </section>
</section>

  );
}

export default Pokemon;
