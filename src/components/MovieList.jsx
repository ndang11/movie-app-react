import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies?.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
