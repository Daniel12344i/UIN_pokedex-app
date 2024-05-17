import React from 'react';
import MainPokemons from './MainPokemons';
import Types from './Types';

function Home() {
  return (
    <div className="home">
      <section className="main-pokemons">
        <h2>Main Pokemons</h2>
        <MainPokemons />
      </section>
      <section className="types">
        <h2>Types</h2>
        <Types />
      </section>
    </div>
  );
}

export default Home;
