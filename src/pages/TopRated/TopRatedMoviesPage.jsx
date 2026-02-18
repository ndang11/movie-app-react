import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./TopRatedMovies.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Top Rated Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  if (loading) return <h2 className={Styles.loading}>Loading Top Rated...</h2>;

  return (
    <div className={Styles.container}>
        <div className={Styles.pic}>
            <img src="https://loudandclearreviews.com/wp-content/uploads/2024/11/anticipated-2025-horror-1024x512.webp" alt="prof" />
        </div>
      <h1 className={Styles.title}>Top Rated Movies</h1>

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
          </Link>
        ))}
      </div>
    </div>
  );
}
