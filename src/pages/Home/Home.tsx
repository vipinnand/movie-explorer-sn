import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Molecule/NavBar/NavBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import MovieResultModal from '../../components/Molecule/SearchedResultModal/SearchedResultModal';
import { customHookMovieView } from '../../Hooks/customeHookMovieView';
import './Home.css';

export default function Home() {
  const [movieKeyword, setMovieKeyword] = useState('');
  const [searchedResult, setSearchResult] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const getMovieName = async (value: string) => {
    if (!value) {
      localStorage.removeItem('searchMovie');
      return;
    }

    const API_KEY = process.env.REACT_APP_VITE_API_KEY;
    const BASE_URL = process.env.REACT_APP_VITE_API_BASE_URL;
    try {
      const fetchMovieName = await fetch(`${BASE_URL}?t=${value}&apikey=${API_KEY}`);
      const result = await fetchMovieName.json();
      if (result?.Response === 'True') {
        localStorage.setItem('searchMovie', JSON.stringify(result));
        setSearchResult(result);
      } else {
        setSearchResult('No movie with this name');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(movieKeyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [movieKeyword]);

  useEffect(() => {
    if (debouncedKeyword) {
      getMovieName(debouncedKeyword);
    } else {
      setSearchResult('');
    }
  }, [debouncedKeyword]);

  const { movies, selectedMovie, openModal, handleOpenModal, handleCloseModal } =
    customHookMovieView();

  return (
    <>
      <Navbar />
      <MovieResultModal open={openModal} handleClose={handleCloseModal} movie={selectedMovie} />
      <Box className="home-container">
        <Box className="overlay" />
        <Box className="center-content">
          <Box className="text-block">
            <Box className="title">
              Unlimited movies,
              <br />
              TV shows and more on
            </Box>
            <Box>
              <Typography variant="h2" className="movie-explorer-title">
                Movie Explorer
              </Typography>
            </Box>
          </Box>

          <Box className="search-bar">
            <TextField
              value={movieKeyword}
              onChange={(e) => setMovieKeyword(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter your movie name to start watching."
              className="search-bar-input"
            />

            {searchedResult?.Title ? (
              <h3 className="search-result" onClick={() => handleOpenModal(searchedResult)}>
                {searchedResult.Title}
              </h3>
            ) : (
              searchedResult && <p className="search-result">{searchedResult}</p>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
