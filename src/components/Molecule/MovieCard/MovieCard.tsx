import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./MovieCard.css";
import { Movie } from "./MovieCard";

const storedMovie = localStorage.getItem("wishlisted") || "[]";
const movie: Movie[] = JSON.parse(storedMovie);

const MovieDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className={`movie-container ${isMobile ? "mobile" : "desktop"}`} role="main">
      <header>
        {/* Left Side */}
        <section className="movie-text-section">
          <div className="movie-text-content">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {movie?.Title}
            </Typography>
            <Typography variant="body1" color="gray" mb={3}>
              {movie?.Plot}
            </Typography>

            <Stack spacing={1} className="movie-info">
              <Typography>
                <b>Year:</b> {movie?.Year}
              </Typography>
              <Typography>
                <b>Released:</b> {movie?.Released}
              </Typography>
              <Typography>
                <b>Runtime:</b> {movie?.Runtime}
              </Typography>
              <Typography>
                <b>Genre:</b> {movie?.Genre}
              </Typography>
              <Typography>
                <b>Director:</b> {movie?.Director}
              </Typography>
              <Typography>
                <b>Writer:</b> {movie?.Writer}
              </Typography>
              <Typography>
                <b>Actors:</b> {movie?.Actors}
              </Typography>
              <Typography>
                <b>Language:</b> {movie?.Language}
              </Typography>
              <Typography>
                <b>Country:</b> {movie?.Country}
              </Typography>
              <Typography>
                <b>IMDb Rating:</b> ⭐ {movie?.imdbRating}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} className="movie-buttons" role="region" aria-labelledby="movie-buttons">
              <Button 
                className="watch-button" 
                aria-label={`Watch ${movie?.Title}`} 
                tabIndex="0"
              >
                Watch
              </Button>
              <Button 
                variant="outlined" 
                color="secondary"
                aria-label={`Watch trailer for ${movie?.Title}`} 
                tabIndex="0"
              >
                Trailer
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                aria-label={`Add ${movie?.Title} to wishlist`} 
                tabIndex="0"
              >
                Wishlist
              </Button>
            </Stack>
          </div>
        </section>
      </header>

      {/* Right Side */}
      <section className={`movie-poster-section ${isMobile ? "mobile-height" : ""}`}>
        <Box
          component="img"
          src={movie?.Poster}
          alt={`Movie poster for ${movie?.Title}`}
          className="movie-poster"
          loading="lazy"
          tabIndex="-1" 
        />
        <Box className="movie-overlay" aria-hidden="true" />
      </section>
    </Box>
  );
};

export default MovieDetailPage;
