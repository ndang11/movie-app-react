import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    };

    const fetchCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await response.json();
      setCast(data.cast.slice(0, 5));
    };

    fetchMovieDetail();
    fetchCast();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-detail">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {movie.vote_average}
        </p>

        <button
          className="favorite-btn"
          onClick={() => navigate("/favorites")}
        >
          Add to Favorites
        </button>

        <h2>Top Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/150"
                }
                alt={actor.name}
              />
              <p>
                <strong>{actor.name}</strong>
              </p>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
