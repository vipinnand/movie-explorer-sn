import React, { useEffect, useState } from 'react';
import { MovieDetails } from './searchTypes';

export const customHookMovieView = () => {
  const [movies, setMovies] = useState<MovieDetails[]>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem('wishlisted') || '[]';

    setMovies(JSON.parse(storedMovies));
  }, []);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
  };

  return {
    movies,
    selectedMovie,
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
