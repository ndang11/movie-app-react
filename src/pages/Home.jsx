import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieProvider";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import useFetchMovies from "../hooks/useFetchMovie";
import PopularMovies from "../components/PopularMovies/PopularMovies";

export default function Home() {
  const { movies, loading } = useContext(MovieContext);
  const [query, setQuery] = useState("");
  const searchResults = useFetchMovies(query);

  if (loading) return <Loader />;

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      <MovieList movies={query ? searchResults : movies} />
      <PopularMovies />
    </div>
  );
}
