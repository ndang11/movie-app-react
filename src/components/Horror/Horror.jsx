import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Horror.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function Horror() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorror = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.log("Horror Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHorror();
  }, []);

  if (loading) return <h2 className={Styles.loading}>Loading horror movies...</h2>;

  return (
    <div className={Styles.page}>
      <h1 className={Styles.title}>Horror Movies</h1>

      <div className={Styles.scrollContainer}>
        <div className={Styles.list}>
          {movies.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className={Styles.card}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.jpg"
                }
                alt={movie.title}
                className={Styles.poster}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
