import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import normalIcon from '../assets/normal.png';
import fightingIcon from '../assets/fighting.png';
import flyingIcon from '../assets/flying.png';
import poisonIcon from '../assets/poisen.png';
import groundIcon from '../assets/ground.png';
import rockIcon from '../assets/rock.png';
import bugIcon from '../assets/bug.png';
import ghostIcon from '../assets/ghost.png';
import steelIcon from '../assets/steel.png';
import fireIcon from '../assets/fire.png';
import waterIcon from '../assets/water.png';
import grassIcon from '../assets/grass.png';
import electricIcon from '../assets/electric.png';
import psychicIcon from '../assets/psychic.png';
import iceIcon from '../assets/ice.png';
import dragonIcon from '../assets/dragon.png';
import darkIcon from '../assets/dark.png';
import fairyIcon from '../assets/fairy.png';

function Pokemon() {
  const { pokemon } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [abilities, setAbilities] = useState([]);

  const typeIcons = {
    normal: normalIcon,
    fighting: fightingIcon,
    flying: flyingIcon,
    poison: poisonIcon,
    ground: groundIcon,
    rock: rockIcon,
    bug: bugIcon,
    ghost: ghostIcon,
    steel: steelIcon,
    fire: fireIcon,
    water: waterIcon,
    grass: grassIcon,
    electric: electricIcon,
    psychic: psychicIcon,
    ice: iceIcon,
    dragon: dragonIcon,
    dark: darkIcon,
    fairy: fairyIcon,
  };

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
        return Promise.all(data.abilities.map(ability => 
          fetch(ability.ability.url)
            .then(response => response.json())
        ));
      })
      .then(abilitiesData => {
        setAbilities(abilitiesData);
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
    <main className='final-boss'>
      <article className="pokemon-detail">
        <header className="pokemon-header">
          <h2>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
          <div className="pokemon-types">
            <h3>TYPE(S)</h3>
            <ul className="types-container">
              {details.types.map(type => (
                <li key={type.type.name}>
                  <Link to={`/type/${type.type.name}`} className={`type-badge ${type.type.name}`}>
                    <img src={typeIcons[type.type.name]} alt={type.type.name} className="type-icon" />
                    <span>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </header>
        <section className={`pokemon-image ${details.types[0].type.name}`}>
          <figure>
            <img src={details.sprites.other['official-artwork'].front_default} alt={details.name} />
          </figure>
        </section>
        <div className="pokemon-info">
          <section className="pokemon-stats">
            <h3>STATS</h3>
            <ul>
              {details.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section className="pokemon-abilities">
          <h3>ABILITIES</h3>
          <div className="ability-container">
            {abilities.map(ability => (
              <article key={ability.name} className="ability">
                <h4>{ability.name.replace('-', ' ')}</h4>
                <p>{ability.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No ability description available.'}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

export default Pokemon;
