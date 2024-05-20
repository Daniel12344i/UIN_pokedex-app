import React from 'react';
import MainPokemons from './MainPokemons';
import Types from './Types';

function Home() {
  return (
    <div className="home">
      <section className="main-pokemons">
        <h1>Main Pokemons</h1>
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
