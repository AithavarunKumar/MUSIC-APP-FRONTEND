import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyPlaylistSongs } from './Songs';
import { Songs } from './Songs';
// Test for MyPlaylistSongsProps interface implementation

describe('MyPlaylistSongsProps Interface Tests', () => {

  test('adjusts items per page correctly on window resize from mobile to desktop', () => {
    global.innerWidth = 480; // Simulate mobile width
    const testSongs = Array.from({ length: 10 }, (_, index) => ({
      title: `Song ${index + 1}`,
      artist: `Artist ${index + 1}`,
      genre: `Genre ${index + 1}`,
      likes: index,
    }));
    render(<MyPlaylistSongs songTitle="Resize Test" Featured={testSongs} />);
    expect(screen.getAllByText(/Song/)).toHaveLength(4); // Mobile items per page
    act(() => {
      global.innerWidth = 1024; // Simulate desktop width
      global.dispatchEvent(new Event('resize'));
    });
    expect(screen.getAllByText(/Song/)).toHaveLength(6); // Desktop items per page
  });
  // Test to ensure handle page click functionality
  test('handles page click correctly', async () => {
    const testSongs = Array.from({ length: 12 }, (_, index) => ({
      title: `Song ${index + 1}`,
      artist: `Artist ${index + 1}`,
      genre: `Genre ${index + 1}`,
      likes: index,
    }));
  })
  // Test to ensure pagination resets correctly when changing songs in the same playlist
  test('resets pagination correctly when changing songs in playlist', () => {
    const testSongs1 = Array.from({ length: 8 }, (_, index) => ({
      title: `Song A${index + 1}`,
      artist: `Artist A${index + 1}`,
      genre: `Genre A${index + 1}`,
      likes: index,
    }));
    const testSongs2 = Array.from({ length: 10 }, (_, index) => ({
      title: `Song B${index + 1}`,
      artist: `Artist B${index + 1}`,
      genre: `Genre B${index + 1}`,
      likes: index,
    }));

    render(<MyPlaylistSongs songTitle="Playlist A" Featured={testSongs1} />);
    expect(screen.getAllByText(/Song A/)).toHaveLength(6); // Assuming itemsPerPage is 6

    const nextPageButton = screen.getByText('>>');
    userEvent.click(nextPageButton);
    expect(screen.queryByText('Song A1')).not.toBeInTheDocument();
    expect(screen.getByText('Song A7')).toBeInTheDocument();

    // Render another playlist
    render(<MyPlaylistSongs songTitle="Playlist B" Featured={testSongs2} />);
    expect(screen.getAllByText(/Song B/)).toHaveLength(6); // Pagination should reset
  });


  describe('Songs Component Tests', () => {
    test('renders Songs component correctly', () => {
      render(<Songs />);
      expect(screen.getByText('Playlists')).toBeInTheDocument();
      expect(screen.getByText('Most Popular')).toBeInTheDocument();
    });
  });
 
})
