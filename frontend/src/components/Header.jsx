// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search'; // Import the Search component

function Header() {
  return (
    <header className="header">
     <Link to="/">
    <div className="logo"></div>
</Link>

      <nav className="nav">
        <Link to="/">UIN POKEDEX</Link>
        <Link to="/teams">Teams</Link>
      </nav>
      <Search /> {/* Include the Search component */}
    </header>
  );
}

export default Header;

