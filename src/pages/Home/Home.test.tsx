import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';


const searchMovie = {
  Title: 'Inception',
  Year: '2010',
};
const detailMovie = {
  Title: 'Inception',
  Year: '2010',
  Plot: 'A mind-bending thriller.',
  Response: 'True',
};

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves search result to localStorage and renders movie title', async () => {
    
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ Response: 'True', Search: [searchMovie] }),
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your movie name/i),
      { target: { value: 'Inception' } }
    );

    
    await screen.findByText(/Inception \(2010\)/i);

    const stored = JSON.parse(localStorage.getItem('searchMovies') || '[]');
    expect(stored[0].Title).toBe('Inception');
  });

  it('shows no movies found message when search returns no results', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ Response: 'False', Error: 'Movie not found' }),
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your movie name/i),
      { target: { value: 'NonexistentMovie' } }
    );

    await screen.findByText(/no movies found or error occurred/i);
  });

  it('fetches movie details and opens modal on movie selection', async () => {
    
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ Response: 'True', Search: [searchMovie] }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(detailMovie),
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your movie name/i),
      { target: { value: 'Inception' } }
    );

   
    const item = await screen.findByText(/Inception \(2010\)/i);
    fireEvent.click(item);

    await screen.findByText(/A mind-bending thriller/i);
  });
});
