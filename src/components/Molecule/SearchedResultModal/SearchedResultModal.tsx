import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/system";
import { List, ListItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
  color: "black",
};

interface Movie {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

interface ReusableModalProps {
  open: boolean;
  handleClose: () => void;
  movie: Movie | null;
  hideWishlist: boolean;
}

const SearchedResultModal = ({
  open,
  handleClose,
  movie,
  hideWishlist,
}: ReusableModalProps) => {
  if (!movie) return null;

  const [wishlistedFlag, setWishlistedFlag] = useState(false);
  useEffect(() => {
    const existingWishlist = JSON.parse(
      (localStorage.getItem("wishlisted") || "[]")
    );

    // Check if movie already exists (by imdbID or Title)
    const alreadyExists = existingWishlist.some(
      (item: any) => item.Title === movie.Title
    );
    setWishlistedFlag(alreadyExists);
  }, []);

  const handleWishlist = () => {
    setWishlistedFlag((prev) => !prev);

    // Get existing wishlist from localStorage
    const existingWishlist = JSON.parse(
      (localStorage.getItem("wishlisted") || "[]")
    );

    // Check if movie already exists (by imdbID or Title)
    const alreadyExists = existingWishlist.some(
      (item: any) => item.Title === movie.Title
    );

    if (!alreadyExists) {
      const updatedWishlist = [...existingWishlist, movie];
      localStorage.setItem("wishlisted", JSON.stringify(updatedWishlist));
      console.log("Movie added to wishlist.");
    } else {
      console.log("Movie is already in the wishlist.");
      let updatedWishlist = existingWishlist.filter(
        (item: any) => item.Title !== movie.Title
      );
      if(!updatedWishlist){
        updatedWishlist = [];
      }
      localStorage.setItem("wishlisted", JSON.stringify(updatedWishlist));
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" component="h1" gutterBottom>
          <strong>
            {movie.Title} ({movie.Year})
          </strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
          </Grid>
          <Grid size={6}>
            <List>
              <ListItem>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "250px" }}
                >
                  watch
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ width: "250px" }}
                >
                  trailer
                </Button>
              </ListItem>
              {!hideWishlist && (
                <ListItem>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "250px",
                      color: wishlistedFlag ? "green" : "grey",
                      borderColor: wishlistedFlag ? "green" : "grey",
                    }}
                    onClick={handleWishlist}
                  >
                    {!wishlistedFlag ? (
                      <>
                        <FavoriteBorderIcon />
                        &nbsp;Wishlist
                      </>
                    ) : (
                      <>
                        <FavoriteIcon />
                        &nbsp;Wishlisted
                      </>
                    )}
                  </Button>
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>

        <Typography variant="body1" gutterBottom>
          <strong>Genre:</strong> {movie.Genre}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Director:</strong> {movie.Director}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          gutterBottom
        >
          {movie.Plot}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>IMDb Rating:</strong> {movie.imdbRating}
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchedResultModal;
