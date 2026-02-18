import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Romance.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function Romance() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRomance = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.log("Romance Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRomance();
  }, []);

  if (loading) return <h2 className={Styles.loading}>Loading romance movies...</h2>;

  return (
    <div className={Styles.page}>
      <h1 className={Styles.title}>Romance Movies</h1>

      <div className={Styles.scrollContainer}>
        <div className={Styles.list}>
          {movies.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className={Styles.card}
            >
              <div className={Styles.indexContainer}>
                <span className={Styles.index}>{index + 1}</span>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-image.jpg"
                  }
                  alt={movie.title}
                  className={Styles.poster}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
