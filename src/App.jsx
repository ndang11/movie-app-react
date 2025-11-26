import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import MovieProvider from "./context/MovieProvider";
import MovieDetails from "./pages/MovieDetails";
import Home from "./pages/Home";

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/* <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}
