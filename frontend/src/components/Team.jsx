import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

const Team = () => {
  const { slug } = useParams();
  const [team, setTeam] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const query = `*[_type == "team" && slug.current == "${slug}"]{ _id, title, image, pokemon[]->{name} }`;
      const result = await sanityClient.fetch(query);
      setTeam(result[0]);

      if (result[0]) {
        const pokemonPromises = result[0].pokemon.map(async p => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}`);
          const data = await response.json();
          return data;
        });
        const pokemonDataResult = await Promise.all(pokemonPromises);
        setPokemonData(pokemonDataResult);
      }
    };

    fetchTeam();
  }, [slug]);

  if (!team) return <div>Loading...</div>;

  return (
    <div className="team-component-container">
      <h1>Team {team.title}</h1>
      <h2>Pokemons</h2>
      <section className="team-pokemon-list">
        {pokemonData.map(p => (
          <div key={p.id} className="team-pokemon-card" style={{ backgroundColor: p.types[0].type.name }}>
            <Link to={`/pokemon/${p.name.toLowerCase()}`} className="team-pokemon-link">
              <h2 className="team-pokemon-name">{p.name}</h2>
              <img src={p.sprites.front_default} alt={`${p.name} sprite`} className="team-pokemon-image" />
            </Link>
            <p className="team-pokemon-id">#{p.id}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Team;
