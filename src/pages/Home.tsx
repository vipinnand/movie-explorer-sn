import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import MovieResultModal from "../components/MovieResultModal";
import { customHookMovieView } from "../components/customeHookMovieView";


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
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflowY: "hidden",
          m: 0,
          p: 0,
          bgcolor: "#000",
        }}
      >
        <ImageList variant="masonry" cols={cols} gap={10} sx={{ m: 0, p: 0 }}>
          {itemData.map((item, index) => (
            <ImageListItem key={index} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

        {/* Center content */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: "80%",
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          {/* Text block */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0 0 8px rgba(0,0,0,0.8)",
                lineHeight: 1.2,
              }}
            >
              Unlimited movies,
              <br />
              TV shows and more on
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "3.5rem",
                  letterSpacing: 1,
                }}
              >
                Movie Explorer
              </Typography>
            </Box>
          </Box>

          {/* Search bar */}
          <Box
            sx={{
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "40px",
              padding: "12px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <TextField
              value={movieKeyword}
              onChange={(e) => setMovieKeyword(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter your movie name to start watching."
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 10,
                boxShadow: 3,
                "& input": {
                  fontSize: "1.1rem",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    borderRadius: 10,
                  },
                },
              }}
            />

            {searchedResult.Title ? (
              <h3 onClick={() => handleOpenModal(searchedResult)}>
                {searchedResult.Title}{" "}
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
