import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useCustomHookMovieView } from '../../Hooks/useCustomeHookMovieView';
import SearchedResultModal from '../../Organisim/SearchedResultModal/SearchedResultModal';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistMovie, setWishlistMovie] = useState([]);

  const { selectedMovie, openModal, handleOpenModal, handleCloseModal } = useCustomHookMovieView();

  const removeFromWishlist = (titleToRemove: string) => {
    const storedMovies = JSON.parse(localStorage.getItem('wishlisted') || '[]');
    const updatedMovies = storedMovies.filter((movie: any) => movie.Title !== titleToRemove);

    localStorage.setItem('wishlisted', JSON.stringify(updatedMovies));
    setWishlistMovie(updatedMovies);
  };

  useEffect(() => {
    const wishlistedMovies = localStorage.getItem('wishlisted') || '[]';
    if (wishlistedMovies) {
      try {
        const parsed = JSON.parse(wishlistedMovies);
        const movieArray = Array.isArray(parsed) ? parsed : [parsed];
        setWishlistMovie(movieArray);
      } catch (e) {
        console.error('Failed to parse wishlist:', e);
      }
    }
  }, []);

  return (
    <Box className="wishlist-container">
      <Typography variant="h4" className="wishlist-title" gutterBottom>
        Your Wishlist
      </Typography>
      <Divider className="divider" />

      {wishlistMovie.length === 0 ? (
        <Typography variant="h6" className="no-movies-message">
          No movies in your wishlist
        </Typography>
      ) : (
        <section
          className="wishlist-cards-container"
          role="region"
          aria-labelledby="wishlist-title"
        >
          {wishlistMovie.map((movie: any) => (
            <Card
              key={movie.imdbID || movie.Title}
              className="wishlist-card"
              tabIndex="0"
              aria-label={`Movie title: ${movie.Title}, description: ${movie.Plot}`}
            >
              <CardMedia
                className="wishlist-card-media"
                image={movie.Poster || '/static/images/cards/contemplative-reptile.jpg'}
                title={movie.Title}
                alt={`Poster of ${movie.Title}`}
                role="img"
                aria-label={`Poster of ${movie.Title}`}
              />
              <CardContent className="wishlist-card-content">
                <Typography gutterBottom variant="h4" component="div">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {movie.Plot}
                </Typography>
              </CardContent>
              <CardActions className="wishlist-card-actions">
                <Button
                  size="small"
                  variant="contained"
                  className="view-button"
                  onClick={() => handleOpenModal(movie)}
                  aria-label={`View details for ${movie.Title}`}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  className="remove-button"
                  onClick={() => removeFromWishlist(movie.Title)}
                  aria-label={`Remove ${movie.Title} from wishlist`}
                  tabIndex="0"
                >
                  Remove from wishlist
                </Button>
              </CardActions>
            </Card>
          ))}
        </section>
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
