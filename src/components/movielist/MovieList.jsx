import MovieCard from "../MovieCard";
import Styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div className={Styles.list}>
      {movies?.map((m, index) => (
        <div key={m.id} className={Styles.movieItem}>
          <div className={Styles.indexWrapper}>
            <span className={Styles.movieIndex}>{index + 1}</span>
          </div>

          <div className={Styles.imageWrapper}>
            <img
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                  : "/no-image.jpg"
              }
              alt=""
            />
          </div>

          {/* <MovieCard movie={m} index={index} /> */}
        </div>
      ))}
    </div>
  );
}
