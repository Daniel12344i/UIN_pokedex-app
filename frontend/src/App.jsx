import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Teams from './components/Teams';
import Type from './components/Type';
import SearchResult from './components/SearchResult';
import Pokemon from './components/Pokemon';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/type/:type" element={<Type />} />
        <Route path="/search/:pokemon" element={<SearchResult />} />
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
