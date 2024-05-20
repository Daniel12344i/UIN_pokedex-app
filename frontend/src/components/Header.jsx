import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search'; // Import the Search component

const Header = () => {
  const pokeballImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'; // URL til Pokéball-bildet

  return (
    <header className="header">
      <div className="logo">
        <img src={pokeballImageUrl} alt="Pokéball" className="pokeball-icon" />
        <Link to="/" className="header-link">UIN POKEDEX</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/teams" className="header-link">Teams</Link>
          </li>
        </ul>
      </nav>
      <Search /> {/* Include the Search component */}
    </header>
  );
};

export default Header;
