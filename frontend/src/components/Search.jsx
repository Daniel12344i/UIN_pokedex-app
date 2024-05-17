import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search/${query.trim()}`); // Trim whitespace
    }
  };

  return (
    <form onSubmit={handleSearch} className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pokémon"
      />
      <button type="submit" className="search-button">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
      </button>
    </form>
  );
}

export default Search;
