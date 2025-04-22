import { render, screen } from '@testing-library/react';
import Wishlist from './Wishlist';
import { vi } from 'vitest';

// Mock the custom hook and modal
vi.mock('../../Hooks/customeHookMovieView', () => ({
  customHookMovieView: () => ({
    selectedMovie: null,
    openModal: false,
    handleOpenModal: vi.fn(),
    handleCloseModal: vi.fn(),
  }),
}));

vi.mock('../../components/Molecule/SearchedResultModal/SearchedResultModal', () => ({
  __esModule: true,
  default: () => <div>Modal</div>,
}));

describe('Wishlist Page', () => {
  beforeEach(() => {
    localStorage.setItem(
      'wishlisted',
      JSON.stringify([{ Title: 'Inception', Plot: 'A dream within a dream', imdbID: '123' }])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders wishlist items from localStorage', () => {
    render(<Wishlist />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('A dream within a dream')).toBeInTheDocument();
  });
});
