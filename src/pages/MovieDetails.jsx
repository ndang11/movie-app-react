import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/movieApi";
import Loader from "../components/Loader";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <Loader />;

  return (
    <div className="details">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <strong>⭐ {movie.vote_average}</strong>
    </div>
  );
}
