import { useEffect, useState } from "react";
import Navbar from "../../components/Molecule/NavBar/NavBar";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import MovieResultModal from "../../components/Molecule/SearchedResultModal/SearchedResultModal";
import { customHookMovieView } from "../../Hooks/customeHookMovieView";
import "./Home.css"; // Import the CSS file

export default function Home() {
  const [movieKeyword, setMovieKeyword] = useState("");
  const [searchedResult, setSearchResult] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const getMovieName = async (value: string) => {
    if (!value) {
      localStorage.removeItem("searchMovie");
      return;
    }

    try {
      const fetchMovieName = await fetch(
        `https://www.omdbapi.com/?t="${value}"&apikey=c9174ba3`
      );
      const result = await fetchMovieName.json();
      if (result?.Response === "True") {
        localStorage.setItem("searchMovie", JSON.stringify(result));
        setSearchResult(result);
      } else {
        setSearchResult("No movie with this name");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(movieKeyword);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [movieKeyword]);

  // API call after debounce
  useEffect(() => {
    if (debouncedKeyword) {
      getMovieName(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const cols = isXs ? 2 : isSm ? 3 : isMd ? 4 : 6;
  const {
    movies,
    selectedMovie,
    openModal,
    handleOpenModal,
    handleCloseModal,
  } = customHookMovieView();

  return (
    <>
      <Navbar />
      <MovieResultModal
        open={openModal}
        handleClose={handleCloseModal}
        movie={selectedMovie}
      />
      <Box className="home-container">
        <ImageList
          variant="masonry"
          cols={cols}
          gap={10}
          className="image-list"
        >
          {itemData.map((item, index) => (
            <ImageListItem key={index} className="image-list-item">
              <Box className="image-item-container">
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  className="image-item"
                />
                <Box className="image-overlay" />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

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

            {searchedResult.Title ? (
              <h3
                className="search-result"
                onClick={() => handleOpenModal(searchedResult)}
              >
                {searchedResult.Title}
              </h3>
            ) : (
              searchedResult
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

const itemData = [
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Chairs",
    author: "Taylor Simpson",
  },
];
