import "./App.css";
import { useState } from "react";
import movieData from "./assets/movie-data.json";
import MovieItem from "./components/MovieItem";
import FilterDropdown from "./components/FilterDropdown";
import React, {useEffect } from "react";
import SortDropdown from "./components/SortDropdown";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

const uniqueLanguages = [...new Set(movieData.map(movie => movie.language))];
const uniqueGenres = [...new Set(movieData.map(movie => movie.genre))];

function App() {
  const [watchlist, setWatchlist] = useState([]);  // useState that adds movie to watchlist
  const [languageFilter, setLanguageFilter] = useState(''); // useState that keeps track of language being filtered by
  const [genreFilter, setGenreFilter] = useState('');  // ... genre being filtered by
  const [filteredMovies, setFilteredMovies] = useState(movieData); // list of filtered movies
  const [sortByReleaseYear, setSortByReleaseYear] = useState(null); 

  useEffect(() => { //filters movies by henre and language
    let filtered = movieData.filter(movie => {
      return (languageFilter ? movie.language === languageFilter : true) &&
             (genreFilter ? movie.genre === genreFilter : true);
    }); 
    setFilteredMovies(filtered);
  }, [languageFilter, genreFilter]);

  useEffect(() => { //sorts movies by ascending or descending release dates
    let sortedAndFiltered = movieData
      .filter(movie => {
        return (languageFilter ? languageFilter.includes(movie.language) : true) &&
               (genreFilter ? genreFilter.includes(movie.genre) : true);
      })
      .sort((first, second) => {
        if (sortByReleaseYear === 'ascending') {
          return first.release - second.release;
        } else if (sortByReleaseYear === 'descending') {
          return second.release - first.release;
        }
        return 0;
      });
  
    setFilteredMovies(sortedAndFiltered);
  }, [languageFilter, genreFilter, sortByReleaseYear, movieData]);

  const clearWatchlist = () => { // resets the watchlist when button clicked
    setWatchlist([]);
  };

  const addToWatchlist = (movie) => { 
    setWatchlist((currentWatchlist) => {
      const isMoviePresent = currentWatchlist.some(item => item.name === movie.name);
      if (!isMoviePresent) { // adds movie if not already in watchlist
        return [...currentWatchlist, movie];
      }
      return currentWatchlist;
    })
  }

  return (
    <div className="App">
      <div className ="movieList">
        <div className="movieListTitle">
          <h1>Movies</h1> {}
          <div className="NavBar">
            <FilterDropdown // filter dropdown component
              setLanguageFilter={setLanguageFilter}
              setGenreFilter={setGenreFilter}
              languages={uniqueLanguages}
              genres={uniqueGenres}
            />
             <SortDropdown // sort dropdown component
              sortByReleaseYear={sortByReleaseYear}
              setSortByReleaseYear={setSortByReleaseYear}
            />
          </div>
        </div>
        <div className="movieListBody">
          {filteredMovies.map((movie) => {
            const isAdded = watchlist.some((watchlistMovie) => watchlistMovie.name === movie.name);
            return (
              <MovieItem
                key={movie.name}
                name={movie.name}
                image={movie.image}
                release={movie.release}
                rating={movie.rating}
                isAdded={isAdded}
                genre={movie.genre}
                display={() => {
                  addToWatchlist({...movie, isAdded: true});
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="watchlist">
        <h1>My Watchlist</h1>
        <p className="watchlistLength"> 
          <h3>Movies to watch: {watchlist.length}</h3>
        </p>
        <button onClick={clearWatchlist} id="button">
          Clear Watchlist
        </button>
        <div className="watchlistContent">
          {watchlist.map(movie => (
            <div key={movie.name} className="watchlistItem">
              <img src={movie.image} alt={movie.name} className="watchlistCard"/>
              <h3>{movie.name}</h3>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
