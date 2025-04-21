import React, { useEffect, useState } from 'react';
import { MovieDetails } from './searchTypes';

export const customHookMovieView = () => {
  const [movies, setMovies] = useState<MovieDetails[]>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem('wishlisted') || "[]";

    setMovies(JSON.parse(storedMovies)); // set state from sample data
  }, []);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie); // Set selected movie data
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null); // Clear the selected movie
  };

  return {
    movies,
    selectedMovie,
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
