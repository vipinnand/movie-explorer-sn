import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Molecule/NavBar/NavBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import MovieResultModal from '../../Organisim/SearchedResultModal/SearchedResultModal';
import { customHookMovieView } from '../../Hooks/customeHookMovieView';
import './Home.css';

export default function Home() {
  const [movieKeyword, setMovieKeyword] = useState('');
  const [searchedResults, setSearchedResults] = useState<any[]>([]); // Store multiple results here
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const getMovies = async (value: string) => {
    if (!value) {
      localStorage.removeItem('searchMovies');
      setSearchedResults([]);
      return;
    }

    const API_KEY = process.env.REACT_APP_VITE_API_KEY;
    const BASE_URL = process.env.REACT_APP_VITE_API_BASE_URL;
    try {
      // Use the 's' parameter for searching multiple movies
      const fetchMovies = await fetch(`${BASE_URL}?s=${encodeURIComponent(value)}&apikey=${API_KEY}`);
      const result = await fetchMovies.json();

      if (result?.Response === 'True') {
        localStorage.setItem('searchMovies', JSON.stringify(result.Search));
        setSearchedResults(result.Search); // Store multiple movie results
      } else {
        setSearchedResults([]); // Reset results if no movies found
      }
    } catch (err) {
      console.log(err);
      setSearchedResults([]); // Handle errors and reset results
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
      getMovies(debouncedKeyword); // Fetch multiple results when the keyword changes
    } else {
      setSearchedResults([]); // Clear results if no keyword
    }
  }, [debouncedKeyword]);

  const { selectedMovie, openModal, handleOpenModal, handleCloseModal } = customHookMovieView();

  return (
    <>
      <Navbar />
      <MovieResultModal open={openModal} handleClose={handleCloseModal} movie={selectedMovie} />
      <main className="home-container">
        <Box className="overlay" />
        <Box className="center-content">
          <section className="text-block">
            <div className="title">
              Unlimited movies,
              <br />
              TV shows and more on
            </div>
            <Box>
              <Typography variant="h2" className="movie-explorer-title">
                Movie Explorer
              </Typography>
            </Box>
          </section>

          <section className="search-bar">
            <TextField
              value={movieKeyword}
              onChange={(e) => setMovieKeyword(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter your movie name to start watching."
              className="search-bar-input"
              aria-label="Movie search input"
              tabIndex="0"
            />

            {searchedResults.length > 0 ? (
              <div className="search-results">
                {searchedResults.map((movie: any) => (
                  <h3
                    key={movie.imdbID}
                    className="search-result"
                    onClick={() => handleOpenModal(movie)} // Open modal with movie details
                    role="button"
                    tabIndex="0"
                    aria-label={`View details for ${movie.Title}`}
                  >
                    {movie.Title} ({movie.Year})
                  </h3>
                ))}
              </div>
            ) : (
              searchedResults.length === 0 && (
                <p className="search-result" aria-live="polite">
                  No movies found or error occurred.
                </p>
              )
            )}
          </section>
        </Box>
      </main>
    </>
  );
}
