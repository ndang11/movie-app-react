import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./MovieDetails.module.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.find((m) => m.id === movie.id);
    if (!exists) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    navigate("/favorites");
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.log("Movie Detail Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 6));
      } catch {
        setCast([]);
      }
    };

    fetchMovieDetail();
    fetchCast();
  }, [id]);

  if (loading) return <div className={Styles.loading}>Loading...</div>;
  if (error) return <div className={Styles.error}>Error loading movie...</div>;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCertification = () => {
    const usRelease = movie.releases?.countries?.find(
      (c) => c.iso_3166_1 === "US"
    );
    if (usRelease?.certification) return usRelease.certification;
    return null;
  };

  const getRatingStars = (rating) => {
    const stars = Math.round(rating / 2);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div className={Styles.wrapper}>
      <div
        className={Styles.backdrop}
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
        }}
      ></div>
      <div className={Styles.backdropOverlay}></div>

      <div className={Styles.content}>
        <div className={Styles.movieSection}>
          <div className={Styles.posterContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className={Styles.poster}
            />
          </div>

          <div className={Styles.info}>
            <h1 className={Styles.title}>{movie.title}</h1>

            <div className={Styles.metaRow}>
              {getCertification() && (
                <span className={Styles.certification}>
                  {getCertification()}
                </span>
              )}
              <span className={Styles.releaseDate}>
                {movie.release_date?.split("-")[0]}
              </span>
              {movie.runtime && (
                <>
                  <span className={Styles.dot}>•</span>
                  <span className={Styles.runtime}>
                    {formatRuntime(movie.runtime)}
                  </span>
                </>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className={Styles.genres}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={Styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.tagline && (
              <p className={Styles.tagline}>"{movie.tagline}"</p>
            )}

            <h3 className={Styles.overviewTitle}>Overview</h3>
            <p className={Styles.overview}>
              {movie.overview || "No overview available."}
            </p>

            <div className={Styles.statsRow}>
              <div className={Styles.stat}>
                <span className={Styles.statLabel}>Rating</span>
                <span className={Styles.statValue}>
                  {movie.vote_average?.toFixed(1)}/10
                </span>
                <span className={Styles.ratingStars}>
                  {getRatingStars(movie.vote_average)}
                </span>
              </div>
              <div className={Styles.stat}>
                <span className={Styles.statLabel}>Votes</span>
                <span className={Styles.statValue}>
                  {movie.vote_count?.toLocaleString()}
                </span>
              </div>
              <div className={Styles.stat}>
                <span className={Styles.statLabel}>Popularity</span>
                <span className={Styles.statValue}>
                  #{Math.round(movie.popularity)}
                </span>
              </div>
            </div>

            <div className={Styles.buttonsRow}>
              <button className={Styles.playBtn}>
                <span className={Styles.playIcon}>▶</span>
                Play
              </button>
              <button className={Styles.favBtn} onClick={addToFavorites}>
                <span>♡</span>
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        <div className={Styles.divider}></div>

        <div className={Styles.castSection}>
          <h2 className={Styles.castTitle}>Top Cast</h2>
          <div className={Styles.castGrid}>
            {cast.map((actor) => (
              <div key={actor.id} className={Styles.castCard}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x185?text=No+Image"
                  }
                  alt={actor.name}
                  className={Styles.castImage}
                />
                <p className={Styles.castName}>{actor.name}</p>
                <p className={Styles.castCharacter}>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
