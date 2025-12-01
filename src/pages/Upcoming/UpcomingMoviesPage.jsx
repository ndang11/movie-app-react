import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./UpcomingMovies.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Upcoming Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (loading) return <h2 className={Styles.loading}>Loading Upcoming...</h2>;

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Upcoming Movies</h1>

      <div className={Styles.grid}>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className={Styles.card}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-image.jpg"
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average}</span>
            <p className={Styles.date}>
              Release: {movie.release_date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
