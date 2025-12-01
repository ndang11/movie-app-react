import React from "react";
import { Link } from "react-router-dom";
import Styles from "./PopularMovieCard.module.css";

export default function PopularMovieCard({ movie, index}) {
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  return (
    <div className={Styles.main}>
    <Link to={`/movie/${movie.id}`} className={Styles.popular1}>
    <div className={Styles.number}>
         <div className={Styles.index}>#{index + 1}</div>
     <div className={Styles.posters}>
       <img src={image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <span>⭐ {movie.vote_average}</span>
     </div>
    </div>
    </Link>
    </div>
  );
}
