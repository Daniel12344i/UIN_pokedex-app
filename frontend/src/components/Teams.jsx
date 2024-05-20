import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient, { urlFor } from '../sanityClient';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const query = `*[_type == "team"]{ _id, title, slug, image }`;
      const result = await sanityClient.fetch(query);
      setTeams(result);
    };

    fetchTeams();
  }, []);

  return (
    <div className='Main-container'>
      <h1 className="teams-title">Teams</h1>
      <section className="teams-container">
        <section className="teams-list">
          {teams.map(team => (
            <article key={team._id} className="team-item">
              <h2 className="team-name">
                <Link to={`/team/${team.slug.current}`}>{team.title}</Link>
              </h2>
              {team.image && team.image.asset && (
                <Link to={`/team/${team.slug.current}`}>
                  <img 
                    className="team-image"
                    src={urlFor(team.image).url()} 
                    alt={team.title} 
                  />
                </Link>
              )}
            </article>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Teams;
