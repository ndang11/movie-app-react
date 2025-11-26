import React, { useContext } from "react";
import { MovieContext } from "../../context/MovieProvider"; 
import PopularMovieCard from "./PopularMovieCard";


export default function PopularMovies() {
  const { movies, loading } = useContext(MovieContext);

  if (loading) return <p className="loading">Loading popular movies…</p>;

  return (
    <section className="popular-movies-container">
      {movies.map((movie) => (
        <PopularMovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
