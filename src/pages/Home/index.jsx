import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import MovieList from '../../components/Home/MovieList';
import Header from '../../components/Home/Header';


const Home = () => {
  
  return (
    <div>
      <Header />
      <header className='home-header' style={{marginTop:'70px'}}>
        <h1>
          <span>“</span> Listado de Películas <span>”</span>
        </h1>
      </header>
      {/* {!movies.length ? <EmptyList /> : <MovieList />} */}
      <MovieList />
    </div>
  );
};

export default Home;
