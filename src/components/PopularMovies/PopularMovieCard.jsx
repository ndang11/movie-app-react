import React from "react";
import { Link } from "react-router-dom";

export default function PopularMovieCard({ movie }) {
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  return (
    <Link to={`/movie/${movie.id}`} className="popular-movie-card">
      <img src={image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <span>⭐ {movie.vote_average}</span>
    </Link>
  );
}
