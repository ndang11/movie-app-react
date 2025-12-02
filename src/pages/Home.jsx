import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieProvider";

import Loader from "../components/Loader";
import useFetchMovies from "../hooks/useFetchMovie";
import HeroSection from "../components/HeroSection/HeroSection";
import Popular from "../components/PopularMovies/PopularMovies";
import Adventure from "../components/Adventure/Adventure";
import Horror from "../components/Horror/Horror";
import Romance from "../components/Romance/Romance";

export default function Home() {
  const { movies, loading } = useContext(MovieContext);
  const [query, setQuery] = useState("");
  const searchResults = useFetchMovies(query);

  if (loading) return <Loader />;

  return (
    <div className="home-container">
      <HeroSection
        poster="https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
        title="Avengers: Endgame"
        overview="After the devastating events of Infinity War, the universe is in ruins and our heroes must assemble once again."
      />

     <Popular />
     <Adventure />
     <Horror />
     <Romance />

    </div>
  );
}
