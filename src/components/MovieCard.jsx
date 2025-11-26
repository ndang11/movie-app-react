// import React from 'react'

// const MovieCard = ({ movie:
//   { title, vote_average, poster_path, release_date, original_language }
// }) => {
//   return (
//     <div className="movie-card">
//       <img
//         src={poster_path ?
//           `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
//         alt={title}
//       />

//       <div className="mini-container">
//         <h3>{title}</h3>

//         <div className="content">
//           <div className="rating">
//             <img src="star.svg" alt="Star Icon" />
//             <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
//           </div>

//           <span>•</span>
//           <p className="language">{original_language}</p>

//           <span>•</span>
//           <p className="year">
//             {release_date ? release_date.split('-')[0] : 'N/A'}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default MovieCard

import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <h3>{movie.title}</h3>
      </div>
    </Link>
  );
}
