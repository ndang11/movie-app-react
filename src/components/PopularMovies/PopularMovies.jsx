import React, { useContext } from "react";
import { MovieContext } from "../../context/MovieProvider"; 
import PopularMovieCard from "./PopularMovieCard";
import Styles from "./PopularMovies.module.css";


export default function PopularMovies() {
  const { movies, loading } = useContext(MovieContext);

  if (loading) return <p className="loading">Loading popular movies…</p>;

  return (
    <section className={Styles.movies}>
      {movies.map((movie) => (
        <PopularMovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
