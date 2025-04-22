import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

// Mock movie object
const mockMovie = {
  Title: 'Inception',
  Plot: 'A mind-bending thriller.',
  Response: 'True',
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockMovie),
  })
) as jest.Mock;

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves search result to localStorage and renders movie title', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter your movie name/i);
    fireEvent.change(input, { target: { value: 'Inception' } });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /view details for inception/i })).toBeInTheDocument()
    );

    const stored = JSON.parse(localStorage.getItem('searchMovie') || '{}');
    expect(stored.Title).toBe('Inception');
  });
});
