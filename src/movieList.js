import React, { useState } from 'react';
import { useDebounceEffect } from "./useDebounceEffect";
import './movieList.css';
import Confirm from './confirm';

export default function MovieList({ searchquery }) {
  // TODO: Give this a better name
  const [localSearch, setLocalSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [cartItemCount, updateCartCount] = useState(0);
  const [selectedMovie, selectMovies] = useState([]);
  const [cartSelected, updateCartSelected] = useState(false);

  // Todo: give better name to the function
  async function callData(searchQuery) {
    if (searchQuery !== localSearch) {
      const apiKey = '90a6be36';
      const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;
      let response = await fetch(url);
      const data = await response.json();

      // TODO: Make a better check here.
      if (!data.Error) {
        setMovies(data.Search.map((it) => it));
      } else {
        setMovies([]);
      }
      setLocalSearch(searchquery);
    }
  }

  useDebounceEffect(() => callData(searchquery), 500);

  let movieEle = searchquery ? (
    <div key="empty-string"> No results found </div>
  ) : (
    ''
  );
  if (movies.length) {
    movieEle = movies.map((movie, key) => (
      <div
        className="movie-list-items"
        key={key}
        onClick={(e) => {
          if (!selectedMovie.includes(e.currentTarget.children[1].textContent))
            selectedMovie.push(e.currentTarget.children[1].textContent);
          const data = [...selectedMovie];
          const len = data.length;
          console.log(data);
          selectMovies(data);
          updateCartCount(len);
        }}
      >
        <img src={movie.Poster} alt="no preview"></img>
        <p className="movie-title" key={movie.Title}>
          {' '}
          {movie.Title}{' '}
        </p>
        <button className="add-cart"> + Add to cart</button>
      </div>
    ));
  }
  const cartEle = cartSelected ? (
    <Confirm confirmprops={selectedMovie} className="modal" />
  ) : (
    ''
  );
  return (
    <div className="movie-list">
      <div className="cart-area">
        <header className="movie-header">Movie Kart</header>
        <button
          className="cart-button"
          onClick={() => {
            updateCartSelected(!cartSelected);
          }}
        >
          Cart {cartItemCount}
        </button>
      </div>
      {movieEle}
      {cartEle}
    </div>
  );
}
