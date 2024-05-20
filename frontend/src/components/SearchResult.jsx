import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function SearchResult() {
  const { pokemon } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      .catch(() => {
        setDetails(null);
        setLoading(false);
      });
  }, [pokemon]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>Finner ikke noe på "{pokemon}".</p>;

  return (
    
    <div className="search-result">
      <h1>Resultater</h1>
      <div className="result-card">
        <Link to={`/pokemon/${details.name.toLowerCase()}`}>
          <img src={details.sprites.other['official-artwork'].front_default} alt={details.name} />
          <h2>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
          <p>#{details.id}</p>
        </Link>
      </div>
    </div>
  );
}

export default SearchResult;
