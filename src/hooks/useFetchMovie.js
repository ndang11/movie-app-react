import { useEffect, useState } from "react";
import { searchMovies } from "../api/movieApi";

export default function useFetchMovies(query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;
    searchMovies(query).then((data) => setResults(data.results))
    .catch(console.error);
  }, [query]);

  return results;
}
