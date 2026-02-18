import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Popular.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.log("Popular Movie Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  if (loading) return <h2 className={Styles.loading}>Loading Popular Movies...</h2>;

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Popular Movies</h1>
      <p className={Styles.subtitle}>Discover the most popular movies right now</p>

      <div className={Styles.grid}>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className={Styles.card}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <p className={Styles.date}>
              Release: {movie.release_date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
