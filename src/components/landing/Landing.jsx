import React from "react";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/movieApi";
import Styles from "./Landing.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function LandingPage() {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    async function fetchPoster() {
      try {
        const movies = await getPopularMovies();
        if (movies.length > 0) {
          setPoster(`${IMAGE_BASE_URL}${movies[0].poster_path}`);
        }
      } catch (err) {
        console.log("Fail to load poster:", err);
      }
    }

    fetchPoster();
  }, []);

  return (
    <div className={Styles.poster}>
      {poster && (
        <img
          src={poster}
          alt="Landing Page Poster"
        />
      )}
      <div className={Styles.head}>
        <h1 className={Styles.title}>
          Welcome to MovieApp
        </h1>
        <p className={Styles.para}>
          Discover popular movies and explore details all in one place.
        </p>
      </div>
    </div>
  );
}
