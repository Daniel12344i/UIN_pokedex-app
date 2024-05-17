import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SearchResult() {
  const { pokemon } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`) // Convert to lowercase
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

  return (
    <div>
      {details ? (
        <div>
          <h2>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
          <img src={details.sprites.front_default} alt={details.name} />
        </div>
      ) : (
        <p>Finner ikke noe på "{pokemon}".</p>
      )}
    </div>
  );
}

export default SearchResult;

