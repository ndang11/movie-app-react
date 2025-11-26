import React from 'react'
import { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/movieApi';

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
 <div className="relative h-screen w-full">
      {poster && (
        <img
          src={poster}
          alt="Landing Page Poster"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen bg-black/40 text-white text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to MovieApp
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Discover popular movies and explore details all in one place.
        </p>
      </div>
    </div>
    );
}