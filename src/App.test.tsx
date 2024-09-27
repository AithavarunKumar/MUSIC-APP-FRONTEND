import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders SongSea Music App Project text in HomePage', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homePageText = screen.getByText(/artistTitle?/i);
  expect(homePageText).toBeInTheDocument();
});
