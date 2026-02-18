import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "./FavoritePage.module.css";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);
    };

    loadFavorites();
    window.addEventListener("storage", loadFavorites);

    return () => window.removeEventListener("storage", loadFavorites);
  }, []);

  const removeAll = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <div className={Styles.favoritePage}>
      <h1>⭐ Your Favorite Movies</h1>

      {favorites.length > 0 && (
        <button className={Styles.clearBtn} onClick={removeAll}>
          🗑️ Remove All
        </button>
      )}

      <div className={Styles.grid}>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className={Styles.card}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className={Styles.poster}
                alt={movie.title}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
