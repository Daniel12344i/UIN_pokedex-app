import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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


function Types() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => setTypes(data.results));
  }, []);

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

  return (
    <div className="types-grid">
      {types.map(type => (
        <Link key={type.name} to={`/type/${type.name}`} className={`type-card ${type.name}`}>
          <img src={typeIcons[type.name]} alt={type.name} className="type-icon" />
          <p>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</p>
        </Link>
      ))}
    </div>
  );
}

export default Types;
