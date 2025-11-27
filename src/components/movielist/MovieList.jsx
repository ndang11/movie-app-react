import MovieCard from "../MovieCard";
import Styles from "./MovieList.module.css";


export default function MovieList({ movies }) {
  return (
    <div className={Styles.list}>
      {movies?.map((m, index) => (
        <div key={m.id} className={Styles.movieItem}>
          <div className={Styles.movieIndex}>{index + 1}</div>
          <MovieCard movie={m} index={index} />
        </div>
      ))}
    </div>
  );
}
