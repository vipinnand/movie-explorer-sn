import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./MovieDetailPage.css";
import { Movie } from "./MovieCard";

const storedMovie = localStorage.getItem("wishlisted") || "[]";
const movie: Movie[] = JSON.parse(storedMovie);

const MovieDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className={`movie-container ${isMobile ? "mobile" : "desktop"}`}>
      {/* Left Side */}
      <Box className="movie-text-section">
        <Box className="movie-text-content">
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

          <Stack direction="row" spacing={2} className="movie-buttons">
            <Button className="watch-button">Watch</Button>
            <Button variant="outlined" color="secondary">
              Trailer
            </Button>
            <Button variant="outlined" color="inherit">
              Wishlist
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        className={`movie-poster-section ${isMobile ? "mobile-height" : ""}`}
      >
        <Box
          component="img"
          src={movie?.Poster}
          alt={movie?.Title}
          className="movie-poster"
        />
        <Box className="movie-overlay" />
      </Box>
    </Box>
  );
};

export default MovieDetailPage;
