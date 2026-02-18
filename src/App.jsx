import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieProvider from "./context/MovieProvider";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import TopRated from "./pages/TopRated/TopRatedMoviesPage";
import Upcoming from "./pages/Upcoming/UpcomingMoviesPage";
import Home from "./pages/Home";
import Popular from "./components/PopularMovies/PopularMovies";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import FavoritePage from "./pages/FavoritePage/FavoritePage";

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/favorites" element={<FavoritePage />} />
          {/* <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </MovieProvider>
  );
}
