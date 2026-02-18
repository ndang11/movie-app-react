import { Link } from "react-router-dom";
import Styles from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.some((m) => m.id === movie.id);

  const toggleFavorite = (e) => {
    e.preventDefault();

    let updated;

    if (isFavorite) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Link to={`/movie/${movie.id}`} className={Styles.card}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={Styles.poster}
      />

      <button
        className={`${Styles.favIcon} ${isFavorite ? Styles.active : ""}`}
        onClick={toggleFavorite}
      >
        ⭐
      </button>
    </Link>
  );
}
