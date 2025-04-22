import { render, screen, fireEvent } from '@testing-library/react';
import SearchedResultModal from './SearchedResultModal';

const mockMovie = {
  Title: 'Inception',
  Year: '2010',
  Genre: 'Sci-Fi',
  Director: 'Christopher Nolan',
  Plot: 'A mind-bending thriller.',
  Poster: 'https://via.placeholder.com/150',
  imdbRating: '8.8',
};

test('renders movie title correctly', () => {
    render(<SearchedResultModal open={true} handleClose={() => {}} movie={mockMovie} hideWishlist={false} />);
    
    // Use a more flexible matcher to check for the movie title
    const movieTitle = screen.getByText((content, element) => 
      content.includes('Inception') && element.tagName.toLowerCase() === 'strong'
    );
    expect(movieTitle).toBeInTheDocument();
  });
  
test('wishlist button toggles state on click', () => {
  render(<SearchedResultModal open={true} handleClose={() => {}} movie={mockMovie} hideWishlist={false} />);
  const wishlistButton = screen.getByText(/wishlist/i);
  fireEvent.click(wishlistButton);
  expect(wishlistButton).toHaveTextContent(/Wishlisted/i);
});
