import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Styles from "./SearchBar.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const fetchMovies = async () => {
    if (!searchTerm) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Search fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto search debounce
  useEffect(() => {
    if (!searchTerm) {
      setMovies([]);
      setIsOpen(false);
      return;
    }

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Show dropdown when there are results
  useEffect(() => {
    if (movies.length > 0 && searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [movies, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={Styles.searchContainer} ref={searchRef}>
      <div className={Styles.searchBar}>
        <img 
          width="40" 
          height="40" 
          src="https://img.icons8.com/color/48/search--v1.png" 
          alt="search"
        />

        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => movies.length > 0 && setIsOpen(true)}
        />

        <button onClick={fetchMovies} className={Styles.searchBtn}>
          Search
        </button>
      </div>

      <div className={`${Styles.searchResults} ${isOpen ? Styles.active : ""}`}>
        {loading && <p className={Styles.loadingMessage}>Searching...</p>}
        
        {!loading && movies.length === 0 && searchTerm && (
          <p className={Styles.noResults}>No movies found.</p>
        )}

        {!loading && movies.length > 0 && (
          <>
            <div className={Styles.resultsHeader}>
              {movies.length} result{movies.length !== 1 ? "s" : ""} found
            </div>
            <div className={Styles.moviesList}>
              {movies.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className={Styles.movieItem}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://via.placeholder.com/45x68?text=N/A"
                    }
                    alt={movie.title}
                    className={Styles.moviePoster}
                  />
                  <div className={Styles.movieInfo}>
                    <p className={Styles.movieTitle}>{movie.title}</p>
                    <div className={Styles.movieMeta}>
                      {movie.release_date && (
                        <span>{movie.release_date.split("-")[0]}</span>
                      )}
                      {movie.vote_average > 0 && (
                        <span>★ {movie.vote_average.toFixed(1)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
