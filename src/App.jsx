 import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCard from './components/MovieCard'

function App() {
  return (
    <Router>
        <MovieCard />
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    </Router>
  )
}

export default App