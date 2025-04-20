import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { customHookMovieView } from "./path-to-your-hook";
import { MovieDetails } from "../components/searchTypes";

// Dummy test component that uses the hook
const TestComponent = () => {
  const {
    movies,
    selectedMovie,
    openModal,
    handleOpenModal,
    handleCloseModal,
  } = customHookMovieView();

  return (
    <div>
      <h1>Test Movie Hook</h1>
      {movies && movies.length > 0 ? (
        movies.map((movie, index) => (
          <div key={index} data-testid="movie-item">
            <p>{movie.Title}</p>
            <button onClick={() => handleOpenModal(movie)}>Open</button>
          </div>
        ))
      ) : (
        <p>No Movies</p>
      )}

      {openModal && selectedMovie && (
        <div data-testid="modal">
          <h2>{selectedMovie.Title}</h2>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

describe("customHookMovieView", () => {
  const mockMovies: MovieDetails[] = [
    { Title: "Batman", Year: "2022", imdbID: "tt123456", Type: "movie", Poster: "batman.jpg" },
  ];

  beforeEach(() => {
    localStorage.setItem("wishlisted", JSON.stringify(mockMovies));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should render movies from localStorage", () => {
    render(<TestComponent />);
    const movieItems = screen.getAllByTestId("movie-item");
    expect(movieItems).toHaveLength(mockMovies.length);
    expect(screen.getByText("Batman")).toBeInTheDocument();
  });

  test("should open and close modal on button clicks", () => {
    render(<TestComponent />);
    const openButton = screen.getByText("Open");
    fireEvent.click(openButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Batman")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
