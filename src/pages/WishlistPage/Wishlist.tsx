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
import { customHookMovieView } from "../../Hooks/customeHookMovieView";
import SearchedResultModal from "../../components/Molecule/SearchedResultModal/SearchedResultModal";
import "./Wishlist.css"; // Import the CSS file

const Wishlist = () => {
  const [wishlistMovie, setWishlistMovie] = useState([]);

  const { selectedMovie, openModal, handleOpenModal, handleCloseModal } =
    customHookMovieView();

  const removeFromWishlist = (titleToRemove: string) => {
    const storedMovies = JSON.parse(localStorage.getItem("wishlisted") || "[]");
    const updatedMovies = storedMovies.filter(
      (movie: any) => movie.Title !== titleToRemove
    );

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
    <Box className="wishlist-container">
      <Typography variant="h4" className="wishlist-title" gutterBottom>
        Your Wishlist
      </Typography>
      <Divider className="divider" />

      {/* Show message if no movies are in the wishlist */}
      {wishlistMovie.length === 0 ? (
        <Typography variant="h6" className="no-movies-message">
          No movies in your wishlist
        </Typography>
      ) : (
        <Box className="wishlist-cards-container">
          {wishlistMovie.map((movie: any) => (
            <Card key={movie.imdbID || movie.Title} className="wishlist-card">
              <CardMedia
                className="wishlist-card-media"
                image={
                  movie.Poster ||
                  "/static/images/cards/contemplative-reptile.jpg"
                }
                title={movie.Title}
              />
              <CardContent className="wishlist-card-content">
                <Typography gutterBottom variant="h5" component="div">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {movie.Plot}
                </Typography>
              </CardContent>
              <CardActions className="wishlist-card-actions">
                <Button
                  size="small"
                  variant="contained"
                  className="view-button"
                  onClick={() => handleOpenModal(movie)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  className="remove-button"
                  onClick={() => removeFromWishlist(movie.Title)}
                >
                  Remove from wishlist
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

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
