import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export interface Movie {
  Title: string;
  Year: string;
  Rated?: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  imdbRating: string;
  Poster: string;
}
const storedMovie = localStorage.getItem("wishlisted");
const movie: Movie | null = storedMovie ? JSON.parse(storedMovie) : null;
const MovieDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Left Side - Text */}
      <Box
        sx={{
          flex: 1,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: isMobile ? 2 : 6,
          py: isMobile ? 4 : 8,
        }}
      >
        <Box maxWidth={600}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.Title}
          </Typography>
          <Typography variant="body1" color="gray" mb={3}>
            {movie.Plot}
          </Typography>

          <Stack spacing={1} fontSize="14px" color="lightgray" mb={4}>
            <Typography>
              <b>Year:</b> {movie.Year}
            </Typography>
            <Typography>
              <b>Released:</b> {movie.Released}
            </Typography>
            <Typography>
              <b>Runtime:</b> {movie.Runtime}
            </Typography>
            <Typography>
              <b>Genre:</b> {movie.Genre}
            </Typography>
            <Typography>
              <b>Director:</b> {movie.Director}
            </Typography>
            <Typography>
              <b>Writer:</b> {movie.Writer}
            </Typography>
            <Typography>
              <b>Actors:</b> {movie.Actors}
            </Typography>
            <Typography>
              <b>Language:</b> {movie.Language}
            </Typography>
            <Typography>
              <b>Country:</b> {movie.Country}
            </Typography>
            <Typography>
              <b>IMDb Rating:</b> ⭐ {movie.imdbRating}
            </Typography>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} marginLeft={"150px"}>
            <Button
              sx={{
                backgroundColor: "#e50914",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#b81d24",
                },
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Watch
            </Button>
            <Button variant="outlined" color="secondary">
              Trailer
            </Button>
            <Button variant="outlined" color="inherit">
              Wishlist
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Right Side - Poster */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: isMobile ? "300px" : "100vh",
        }}
      >
        <Box
          component="img"
          src={movie.Poster}
          alt={movie.Title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8)",
          }}
        />

        {/* Camouflage Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to left, rgba(0,0,0,0.8), transparent 60%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default MovieDetailPage;
