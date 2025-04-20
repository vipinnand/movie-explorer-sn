import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { customHookMovieView } from "../Hooks/customeHookMovieView";
import SearchedResultModal from "../components/Molecule/SearchedResultModal/SearchedResultModal";

const Wishlist = () => {
  const [wishlistMovie, setWishlistMovie] = useState([]);

  const { selectedMovie, openModal, handleOpenModal, handleCloseModal } =
    customHookMovieView();

  const removeFromWishlist = (titleToRemove: string) => {
    const storedMovies = JSON.parse(localStorage.getItem("wishlisted") || "[]");
    console.log(storedMovies);

    const updatedMovies = storedMovies.filter(
      (movie: any) => movie.Title !== titleToRemove
    );
    console.log(updatedMovies);

    localStorage.setItem("wishlisted", JSON.stringify(updatedMovies));
    setWishlistMovie(updatedMovies);
  };

  useEffect(() => {
    const wishlistedMovies = localStorage.getItem("wishlisted");
    if (wishlistedMovies) {
      try {
        const parsed = JSON.parse(wishlistedMovies);
        const movieArray = Array.isArray(parsed) ? parsed : [parsed];
        setWishlistMovie(movieArray);
      } catch (e) {
        console.error("Failed to parse wishlist:", e);
      }
    }
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Divider sx={{ backgroundColor: "white", mb: 2 }} />

      <Box display="flex" flexWrap="wrap" gap={2}>
        {wishlistMovie.map((movie: any) => (
          <Card key={movie.imdbID || movie.Title} sx={{ width: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={
                movie.Poster || "/static/images/cards/contemplative-reptile.jpg"
              }
              title={movie.Title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {movie.Title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {movie.Plot}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleOpenModal(movie)}
              >
                View Details
              </Button>
              <Button
                size="small"
                onClick={() => removeFromWishlist(movie.Title)}
              >
                Remove from wishlist
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedMovie && (
        <SearchedResultModal
          open={openModal}
          handleClose={handleCloseModal}
          movie={selectedMovie}
          hideWishlist={true}
        />
      )}
    </Box>
  );
};

export default Wishlist;
