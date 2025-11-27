import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./SearchBar.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
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

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className={Styles.searchContainer}>
      <div className={Styles.searchBar}>
        <img src="search.svg" alt="search icon" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={Styles.searchResults}>
        {loading && <p>Loading...</p>}
        {movies.length === 0 && searchTerm && !loading && (
          <p>No movies found.</p>
        )}
        <div className={Styles.moviesGrid}>
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className={Styles.movieCard}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.jpg"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
